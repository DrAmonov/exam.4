const AdminModel = require('../models/User.js');
const checkToken = require('./checkToken.js');

const adminCheck = async (req, res) => {
	try {
		const token = req.headers?.authorization;
		const id = req.params?.id;

		const getToken = checkToken(token, res);

		const checkAdmin = await AdminModel.findOne({
			_id: getToken?.id,
			email: getToken?.email,
		});

		if (!checkAdmin) throw new Error('You are not an Admin!');

		return;
	} catch (err) {
		return err.message;
	}
};
