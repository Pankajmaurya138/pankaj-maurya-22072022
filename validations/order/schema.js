/* eslint-disable max-len */
/* eslint-disable newline-per-chained-call */
const Joi = require('joi');


const OrderDetail = Joi.object({
    order_id: Joi.string().required(),
});

const UpdateOrderStatus = Joi.object({
    order_id: Joi.string().required(),
	order_status: Joi.array().items(
        Joi.string().valid(
          "PENDING",
          "PROCESSING",
          "CONFIRMED",
		  'DELIVERED',
		  'REJECTED'
        )
      ).single(),
});

const addCheckListAnswer= Joi.object({
    order_id: Joi.string().required(),
	checklist_with_answer:Joi.array(),
});

const uploadFile = Joi.object({
    upload_file: Joi.string().required(),
});



module.exports = {
  OrderDetail,
  UpdateOrderStatus,
  uploadFile,
  addCheckListAnswer
};
