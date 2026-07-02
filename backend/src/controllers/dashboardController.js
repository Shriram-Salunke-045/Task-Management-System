const { User, Task } = require("../models");
const { Op } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
    try {

        const totalUsers = await User.count();

        const totalTasks = await Task.count();

        const completedTasks = await Task.count({
            where: {
                status: "COMPLETED"
            }
        });

       

       const pendingTasks = await Task.count({
    where: {
        status: {
            [Op.in]: ["TODO", "IN_PROGRESS"]
        }
    }
});

        res.json({
            totalUsers,
            totalTasks,
            completedTasks,
            pendingTasks
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};