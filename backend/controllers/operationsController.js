const Operation = require('../models/operation');

const addOperation = async (req, res) => {
    const { amount, type, comment } = req.body;

    try {
        const operation = new Operation({
            userId: req.user.id,
            amount,
            type,
            comment,
        });

        await operation.save();

        res.status(201).json(operation);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

const getOperations = async (req, res) => {
    try {
        const operations = await Operation.find({ userId: req.user.id })
            .sort({ date: -1 })
            .limit(10);

        const totalIncome = await Operation.aggregate([
            { $match: { type: 'income' } },
            { $group: { _id: "userId", total: { $sum: '$amount' } } },
        ]);

        const totalExpense = await Operation.aggregate([
            { $match: {type: 'expense' } },
            { $group: { _id: "userId", total: { $sum: '$amount' } } },
        ]);

        res.status(200).json({
            operations,
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};

const deleteOperation = async (req, res) => {
    try {
        const operation = await Operation.findById(req.params.id);

        if (!operation) {
            return res.status(404).json({ message: 'Operation not found' });
        }

        if (operation.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Operation.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Operation removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error});
    }
};

module.exports = { addOperation, getOperations, deleteOperation };
