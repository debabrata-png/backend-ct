const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  // Institution identification
  name: {
    type: String,
    required: [true, 'Please enter name']
  },

  user: {
    type: String,
    required: [true, 'Please enter user']
  },

  colid: {
    type: Number,
    required: [true, 'Please enter colid']
  },

  // Coupon details
  couponCode: {
    type: String,
    required: [true, 'Please enter coupon code'],
    uppercase: true,
    trim: true,
    unique: true
  },

  couponName: {
    type: String,
    required: [true, 'Please enter coupon name']
  },

  description: {
    type: String
  },

  // Discount configuration
  discountType: {
    type: String,
    enum: ['PERCENTAGE', 'FIXED'],
    required: [true, 'Please select discount type']
  },

  discountValue: {
    type: Number,
    required: [true, 'Please enter discount value'],
    min: 0
  },

  // Discount limits
  maximumDiscount: {
    type: Number
  },

  minimumOrderAmount: {
    type: Number,
    default: 0
  },

  // Validity
  validFrom: {
    type: Date,
    required: [true, 'Please enter valid from date'],
    default: Date.now
  },

  validTo: {
    type: Date,
    required: [true, 'Please enter valid to date']
  },

  isActive: {
    type: Boolean,
    default: true
  },

  // Usage limits
  usageLimit: {
    type: Number
  },

  usageCount: {
    type: Number,
    default: 0
  },

  perUserLimit: {
    type: Number,
    default: 1
  },

  // Applicability
  applicablePaymentTypes: [{
    type: String,
    enum: [
      'SEMESTER_FEE',
      'EXAM_FEE',
      'ADMISSION_FEE',
      'HOSTEL_FEE',
      'LIBRARY_FEE',
      'REGISTRATION_FEE',
      'FINE',
      'OTHER',
      'ALL'
    ]
  }],

  applicableCourses: [{
    type: String
  }],

  applicableDepartments: [{
    type: String
  }],

  applicableSemesters: [{
    type: String
  }],

  applicableProgramcodes: [{
    type: String
  }],

  // Eligibility criteria - Only regno
  eligibleRegnos: [{
    type: String,
    description: "Specific student registration numbers eligible for this coupon"
  }],

  eligibleCategories: [{
    type: String
  }],

  // First time user only
  firstTimeUserOnly: {
    type: Boolean,
    default: false
  },

  // Coupon stacking
  canStackWithOtherOffers: {
    type: Boolean,
    default: false
  },

  // Usage tracking - Only student name and regno
  usageHistory: [{
    student: {
      type: String,
      description: "Student name"
    },
    regno: {
      type: String,
      description: "Student registration number"
    },
    orderid: {
      type: String,
      description: "Order ID from payment"
    },
    discountAmount: Number,
    usedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Terms and conditions
  termsAndConditions: {
    type: String
  },

  // Marketing
  isPublic: {
    type: Boolean,
    default: true
  },

  promotionMessage: {
    type: String
  },

  // Audit trail
  createdBy: {
    type: String,
    required: [true, 'Please enter created by']
  },

  updatedBy: {
    type: String
  },

  notes: {
    type: String
  }

}, { timestamps: true });

// Compound indexes
couponSchema.index({ colid: 1, isActive: 1, validFrom: 1, validTo: 1 });

couponSchema.index({ colid: 1, validFrom: 1, validTo: 1 });

// Method to validate coupon
couponSchema.methods.validateCoupon = function (regno, orderAmount, paymentType, studentInfo = {}) {
  const now = new Date();

  // Check if coupon is active
  if (!this.isActive) {
    return { valid: false, message: 'Coupon is not active' };
  }

  // Check validity dates
  if (now < this.validFrom || now > this.validTo) {
    return { valid: false, message: 'Coupon has expired or not yet valid' };
  }

  // Check usage limit
  if (this.usageLimit && this.usageCount >= this.usageLimit) {
    return { valid: false, message: 'Coupon usage limit exceeded' };
  }

  // Check minimum order amount
  if (orderAmount < this.minimumOrderAmount) {
    return {
      valid: false,
      message: `Minimum order amount of ₹${this.minimumOrderAmount} required`
    };
  }

  // Check per user limit using regno
  const userUsageCount = this.usageHistory.filter(
    h => h.regno === regno
  ).length;

  if (userUsageCount >= this.perUserLimit) {
    return { valid: false, message: 'You have already used this coupon maximum times' };
  }

  // Check payment type applicability
  if (this.applicablePaymentTypes.length > 0 &&
    !this.applicablePaymentTypes.includes(paymentType) &&
    !this.applicablePaymentTypes.includes('ALL')) {
    return { valid: false, message: 'Coupon not applicable for this payment type' };
  }

  // Check course applicability
  if (this.applicableCourses.length > 0 && studentInfo.course &&
    !this.applicableCourses.includes(studentInfo.course)) {
    return { valid: false, message: 'Coupon not applicable for your course' };
  }

  // Check department applicability
  if (this.applicableDepartments.length > 0 && studentInfo.department &&
    !this.applicableDepartments.includes(studentInfo.department)) {
    return { valid: false, message: 'Coupon not applicable for your department' };
  }

  // Check semester applicability
  if (this.applicableSemesters.length > 0 && studentInfo.semester &&
    !this.applicableSemesters.includes(studentInfo.semester)) {
    return { valid: false, message: 'Coupon not applicable for your semester' };
  }

  // Check program code applicability
  if (this.applicableProgramcodes.length > 0 && studentInfo.programcode &&
    !this.applicableProgramcodes.includes(studentInfo.programcode)) {
    return { valid: false, message: 'Coupon not applicable for your program' };
  }

  // Check eligible students using regno
  if (this.eligibleRegnos.length > 0 &&
    !this.eligibleRegnos.includes(regno)) {
    return { valid: false, message: 'You are not eligible for this coupon' };
  }

  // Check category eligibility
  if (this.eligibleCategories.length > 0 && studentInfo.category &&
    !this.eligibleCategories.includes(studentInfo.category)) {
    return { valid: false, message: 'Coupon not applicable for your category' };
  }

  return { valid: true, message: 'Coupon is valid' };
};

// Method to calculate discount
couponSchema.methods.calculateDiscount = function (orderAmount) {
  let discount = 0;

  if (this.discountType === 'FIXED') {
    discount = this.discountValue;
  } else if (this.discountType === 'PERCENTAGE') {
    discount = (orderAmount * this.discountValue) / 100;

    // Apply maximum discount cap if set
    if (this.maximumDiscount && discount > this.maximumDiscount) {
      discount = this.maximumDiscount;
    }
  }

  // Ensure discount doesn't exceed order amount
  if (discount > orderAmount) {
    discount = orderAmount;
  }

  return parseFloat(discount.toFixed(2));
};

// Method to apply coupon (increments usage)
couponSchema.methods.applyCoupon = async function (student, regno, orderid, discountAmount) {
  this.usageCount += 1;
  this.usageHistory.push({
    student,
    regno,
    orderid,
    discountAmount,
    usedAt: new Date()
  });

  await this.save();
};

// Static method to find valid coupons for institution
couponSchema.statics.findValidCoupons = function (colid, paymentType = null) {
  const now = new Date();
  const query = {
    colid,
    isActive: true,
    validFrom: { $lte: now },
    validTo: { $gte: now },
    $or: [
      { usageLimit: null },
      { $expr: { $lt: ['$usageCount', '$usageLimit'] } }
    ]
  };

  if (paymentType) {
    query.$or = [
      { applicablePaymentTypes: paymentType },
      { applicablePaymentTypes: 'ALL' },
      { applicablePaymentTypes: { $size: 0 } }
    ];
  }

  return this.find(query).sort({ createdAt: -1 });
};

const couponds = mongoose.model('couponds', couponSchema);

module.exports = couponds;
