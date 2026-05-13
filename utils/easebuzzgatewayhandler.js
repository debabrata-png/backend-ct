const crypto = require('crypto');

class EasebuzzPaymentHandler {
  constructor(config = {}) {
    this.key = config.key || '';
    this.salt = config.salt || '';
    this.env = config.env || 'test'; // 'test' or 'prod'
    this.baseUrl = this.env === 'prod' 
      ? 'https://pay.easebuzz.in/' 
      : 'https://testpay.easebuzz.in/';
  }

  /**
   * Generate SHA512 Hash for Payment Initiation
   * Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt
   */
  generateHash(params) {
    const hashString = [
      this.key,
      params.txnid,
      params.amount,
      params.productinfo,
      params.firstname,
      params.email,
      params.udf1 || '',
      params.udf2 || '',
      params.udf3 || '',
      params.udf4 || '',
      params.udf5 || '',
      params.udf6 || '',
      params.udf7 || '',
      params.udf8 || '',
      params.udf9 || '',
      params.udf10 || '',
      this.salt
    ].join('|');

    return crypto.createHash('sha512').update(hashString).digest('hex');
  }

  /**
   * Verify Hash for Response
   * Format: salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
   */
  verifyResponseHash(params) {
    const hashString = [
      this.salt,
      params.status,
      params.udf10 || '',
      params.udf9 || '',
      params.udf8 || '',
      params.udf7 || '',
      params.udf6 || '',
      params.udf5 || '',
      params.udf4 || '',
      params.udf3 || '',
      params.udf2 || '',
      params.udf1 || '',
      params.email,
      params.firstname,
      params.productinfo,
      params.amount,
      params.txnid,
      this.key
    ].join('|');

    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
    return calculatedHash === params.hash;
  }

  /**
   * Get Initiation URL
   */
  getInitiationUrl() {
    return `${this.baseUrl}payment/initiateLink`;
  }
}

module.exports = EasebuzzPaymentHandler;
