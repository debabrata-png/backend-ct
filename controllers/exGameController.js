const exGame = require('./../Models/exGame');
const exAgent = require('./../Models/exAgent');

// Initialize game
exports.exInitGame = async (req, res) => {
    const { colid } = req.body;

    let game = await exGame.findOne({ colid });

    if (!game) {
        game = await exGame.create({
            colid,
            balance: 500000,
            totalToys: 0
        });
    }

    res.json(game);
};

// Hire agent
exports.exHireAgent = async (req, res) => {
    const { colid } = req.body;

    const toysPerHour = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    const productivity = (Math.random() * (1 - 0.6) + 0.6).toFixed(2);

    const monthlyCost = toysPerHour * 1000;

    const agent = await exAgent.create({
        name: "Agent",
        colid,
        toysPerHour,
        productivity,
        monthlyCost
    });

    const game = await exGame.findOne({ colid });

    game.agents.push(agent._id);
    game.balance -= monthlyCost;

    await game.save();

    res.json({ agent, game });
};

// Run simulation (1 day)
exports.exRunDay = async (req, res) => {
    const { colid } = req.body;

    const game = await exGame.findOne({ colid }).populate('agents');

    let totalToys = 0;

    game.agents.forEach(agent => {
        const toys = agent.toysPerHour * 8 * agent.productivity;
        totalToys += toys;
    });

    const revenue = totalToys * 100;

    game.balance += revenue;
    game.totalToys += totalToys;

    await game.save();

    res.json({ totalToys, revenue, game });
};