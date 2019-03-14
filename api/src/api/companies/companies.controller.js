const entity = "companies";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

module.exports.get = (req, res, next) => {
  service
    .getCompanies()
    .then(companies => res.status(httpStatus.OK).json(companies))
    .catch(err => next(err));
};

module.exports.getById = (req, res, next) => {
  service
    .getCompanyById(req.params.id)
    .then(company => res.status(httpStatus.OK).json(company))
    .catch(err => next(err));
};

module.exports.signin = (req, res, next) => {
  service
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
};

module.exports.signout = (req, res, next) => {
  service.logout(req.body).then(result => {
    result
      ? res.status(httpStatus.OK).json("Ok")
      : res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Internal Error");
  });
};

module.exports.register = (req, res, next) => {
  service
    .register(req.body, Role.Executor)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.confirm = (req, res, next) => {
  service
    .confirmEmail(req.query.token)
    .then(user => {
      res.status(httpStatus.CREATED).json(user);
    })
    .catch(err => next(err));
};

module.exports.block = (req, res, next) => {
  service
    .blockCompany(req.params.id, req.body)
    .then(() => { 
      res.status(httpStatus.OK).json(`Company ${req.params.id} blocked`) 
    })
    .catch(err => next(err));
};

module.exports.unblock = (req, res, next) => {
  service
    .unblockCompany(req.params.id)
    .then(() => { 
      res.status(httpStatus.OK).json(`Company ${req.params.id} unblocked`) 
    })
    .catch(err => next(err));
};

module.exports.rate = (req, res, next) => {
  if ((req.body.value > 5) | (req.body.value < 0)) return res.send("Неверная оценка");

  service
    .rateCompany(req.user.id, req.body, req.params.id)
    .then(() => { 
      res.status(httpStatus.OK).json(`Company ${req.params.id} rated`) 
    })
    .catch(err => next(err));
};

module.exports.edit = (req, res, next) => {
  if (req.body.email && req.body.password && req.body.phoneNumber && req.body.companyName && req.body.description && req.body.adress ) {
    service
      .editProfile(req.user.id, req.body)
      .then(() => {
        res.status(httpStatus.OK).json(`Company ${req.user.id} edited`);
      })
      .catch(err => next(err));
  } else next("Введены не все данные")
};