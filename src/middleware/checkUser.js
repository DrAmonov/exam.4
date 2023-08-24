const Joi = require('joi');
const checkUser = (req, res, next) => {
	try {
		const checkUser = Joi.object({
			first_name: Joi.string().required().min(3).max(100),
			last_name: Joi.string().required().min(3).max(100),
			contact: Joi.string().required().min(9).max(13),
			email: Joi.string().email().min(14).max(120).required(),
			gender: Joi.boolean().required(),
		});

		const validate = checkUser.validate(req.body);

		if (validate?.error) throw new Error(validate?.error);
		next();
	} catch (err) {
		return res.status(501).send({
			status: 501,
			message: err.message,
			data: null,
		});
	}
};
