export const asyncErrorHandler = (func) => {
    return (req, res, next) => {
       func(req, res, next).catch((err) => res.status(404).send({message:err.message}));
    };
  };
   