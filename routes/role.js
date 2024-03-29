const express = require('express');
const router = express.Router();
// 数据库
let db = require('../config/mysql');
/**
 * @api {get} /role/list 获取角色列表
 * @apiName RoleList
 * @apiGroup Role
 * @apiPermission admin
 *
 * @apiSampleRequest /role/list
 */
router.get('/list', async (req, res) => {
	let sql = `SELECT id, role_name AS name FROM role`;
	let results = await db.query(sql);
	if (!results.length) {
		res.json({
			status: false,
			msg: "获取失败！"
		});
		return false;
	}
	// 获取成功
	res.json({
		status: true,
		msg: "获取成功！",
		data: results
	});
});
/**
 * @api {post} /role 添加角色
 * @apiName RoleAdd
 * @apiGroup Role
 * @apiPermission admin
 *
 * @apiParam {String} name 角色名称.
 *
 * @apiSampleRequest /role
 */
router.post('/', async (req, res) => {
	let { name } = req.body;
	let sql = `INSERT INTO role (role_name) VALUES (?)`;
	let { insertId } = await db.query(sql, [name]);
	res.json({
		status: true,
		msg: "success!",
		data: {
			id: insertId
		}
	});
});
/**
 * @api {delete} /role 删除角色
 * @apiName RoleDelete
 * @apiGroup Role
 * @apiPermission admin
 *
 * @apiParam {String} id 角色id.
 *
 * @apiSampleRequest /role
 */
router.delete('/', async (req, res) => {
	let { id } = req.query;
	let sql = `DELETE FROM role WHERE id = ?`;
	let results = await db.query(sql, [id]);
	res.json({
		status: true,
		msg: "success!",
	});
});
/**
 * @api {put} /role 更新角色
 * @apiName RoleUpdate
 * @apiGroup Role
 * @apiPermission admin
 *
 * @apiParam {String} id 角色id.
 * @apiParam {String} name 角色名称.
 *
 * @apiSampleRequest /role
 */
router.put('/', async (req, res) => {
	let { id, name } = req.body;
	let sql = `UPDATE role SET role_name = ? WHERE id = ?`;
	let results = await db.query(sql, [name, id]);
	res.json({
		status: true,
		msg: "success!",
	});
});

module.exports = router;
