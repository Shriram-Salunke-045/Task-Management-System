const {
    Task,
    TaskAssignment,
    ActivityLog
} = require("../models");

exports.createTask = async (req, res) => {

    try {

        const { title, description } = req.body;

        const task = await Task.create({

            title,
            description,
            createdBy: req.user.id

        });

        await TaskAssignment.create({

            UserId: req.user.id,
            TaskId: task.id

        });

        await ActivityLog.create({

            UserId: req.user.id,
            TaskId: task.id,
            action: "Task Created"

        });

        return res.status(201).json({

            message: "Task created successfully",

            task

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            message: error.message

        });

    }

};

const { User } = require("../models");

exports.getAllTasks = async (req, res) => {
  try {

    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
          through: {
            attributes: []
          }
        }
      ]
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Only creator or Admin can update
    const assignment = await TaskAssignment.findOne({
  where: {
    TaskId: task.id,
    UserId: req.user.id,
  },
});

if (
  req.user.role !== "ADMIN" &&
  task.createdBy !== req.user.id &&
  !assignment
) {
  return res.status(403).json({
    success: false,
    message: "You are not authorized to update this task",
  });
}

    await task.update({
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
    });

    // Create activity log
    await ActivityLog.create({
      UserId: req.user.id,
      TaskId: task.id,
      action: "Task Updated",
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        // Delete assignments first
        await TaskAssignment.destroy({
            where: {
                TaskId: task.id
            }
        });

        // Delete activity logs
        await ActivityLog.destroy({
            where: {
                TaskId: task.id
            }
        });

        // Delete task
        await task.destroy();

        return res.status(200).json({

            success: true,
            message: "Task deleted successfully"

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

exports.assignUsers = async (req, res) => {
    try {

        const { id } = req.params;
        const { userIds } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        for (const userId of userIds) {

            const user = await User.findByPk(userId);

            if (!user) continue;

            const alreadyAssigned = await TaskAssignment.findOne({
                where: {
                    UserId: userId,
                    TaskId: id
                }
            });

            if (!alreadyAssigned) {

                await TaskAssignment.create({
                    UserId: userId,
                    TaskId: id
                });

                await ActivityLog.create({
                    UserId: req.user.id,
                    TaskId: id,
                    action: `Assigned user ${user.name}`
                });

            }
        }

        return res.status(200).json({
            success: true,
            message: "Users assigned successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};