const Options = require("./optionsModel")

exports.indexOptions = (req, res) => {
    Options.getOptions((err, option) => {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      }
      res.json({
        status: "success",
        message: "Options retrieved successfully",
        data: option,
      });
    });
  };
  
  exports.newOptions = (req, res) => {
    const option = new Options();
    option.showCompleted = req.body.showCompleted ? req.body.showCompleted : option.showCompleted;

    option.save((err) => {
      if (err) res.json(err);
  
      res.json({
        message: "New option created!",
        data: option,
      });
    });
  };

  exports.view = (req, res) => {
    Options.findById(req.params.options_id, (err, option) => {
      if (err) res.send(err);
      res.json({
        message: "Option details loading..",
        data: option,
      });
    });
  };

  exports.update = (req, res) => {
    Options.findById(req.params.options_id, (err, option) => {
      if (err) res.send(err);
      option.showCompleted = req.body.showCompleted 

      option.save((err) => {
        if (err) res.json(err);
        res.json({
          message: "Option Info updated",
          data: option,
        });
      });
    });
  };

  exports.delete = (req, res) => {
    Options.remove(
      {
        _id: req.params.options_id,
      },
       (err, option) => {
        if (err) res.send(err);
        res.json({
          status: "success",
          message: "Option deleted",
        });
      }
    );
  };