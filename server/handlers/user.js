const makeValidation = require('@withvoid/make-validation');

const db = require('./../models/');

exports.onGetAllUsers = async (req, res) => {
    try {
        const users = await db.User.getUsers();
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

exports.onGetUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

exports.onCreateUser = async (req, res) => {
    try {
        const validation = makeValidation(types => ({
            payload: req.body,
            checks: {
                firstName: { type: types.string },
                lastName: { type: types.string },
                type: { type: types.enum, options: { enum: db.USER_TYPES } },
            }
        }));
        if (!validation.success) return res.status(400).json({ ...validation });

        const { firstName, lastName, type } = req.body;
        const user = await User.createUser(firstName, lastName, type);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

exports.onDeleteUserById = async (req, res) => {
    try {
        const user = await User.deleteByUserById(req.params.id);
        return res.status(200).json({
            success: true,
            message: `Deleted a count of ${user.deletedCount} user.`
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}