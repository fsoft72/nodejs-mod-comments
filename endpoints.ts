/*
 * This file has been generated by flow2code
 * See: https://flow.liwe.org
 */

import { ILRequest, ILResponse, ILError, ILiWE } from '../../liwe/types';
import { send_error, send_ok, typed_dict } from "../../liwe/utils";
import { locale_load } from '../../liwe/locale';

import { perms } from '../../liwe/auth';

import {
	// endpoints function
	delete_comments_admin_del, delete_comments_delete, get_comments_admin_list, post_comments_add,
	// functions
	comments_list,
} from './methods';

import {
	CommentType, CommentTypeKeys,
} from './types';

/*=== f2c_start __header ===*/
import { comments_db_init } from './methods';
/*=== f2c_end __header ===*/

export const init = ( liwe: ILiWE ) => {
	const app = liwe.app;

	console.log( "    - comments " );

	liwe.cfg.app.languages.map( ( l ) => locale_load( "comments", l ) );
	comments_db_init ( liwe );

	app.post ( '/api/comments/add', perms( [ "is-logged" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { module, id_obj, text, visible, ___errors } = typed_dict( req.body, [
			{ name: "module", type: "string", required: true },
			{ name: "id_obj", type: "string", required: true },
			{ name: "text", type: "string", required: true },
			{ name: "visible", type: "boolean" }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		post_comments_add ( req, module, id_obj, text, visible, ( err: ILError, comment: CommentType ) => {
			if ( err?.quiet ) return;
			if ( err ) return send_error( res, err );

			send_ok( res, { comment } );
		} );
	} );

	app.delete ( '/api/comments/delete', perms( [ "is-logged" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { id, ___errors } = typed_dict( req.body, [
			{ name: "id", type: "string", required: true }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		delete_comments_delete ( req, id, ( err: ILError, ok: boolean ) => {
			if ( err?.quiet ) return;
			if ( err ) return send_error( res, err );

			send_ok( res, { ok } );
		} );
	} );

	app.get ( '/api/comments/admin/list', perms( [ "comments.admin" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { module, ___errors } = typed_dict( req.query as any, [
			{ name: "module", type: "string" }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		get_comments_admin_list ( req, module, ( err: ILError, comments: CommentType ) => {
			if ( err?.quiet ) return;
			if ( err ) return send_error( res, err );

			send_ok( res, { comments } );
		} );
	} );

	app.delete ( '/apicomments/admin/del', perms( [ "comments.admin" ] ), ( req: ILRequest, res: ILResponse ) => {
		const { id, ___errors } = typed_dict( req.body, [
			{ name: "id", type: "string", required: true }
		] );

		if ( ___errors.length ) return send_error ( res, { message: `Parameters error: ${___errors.join ( ', ' )}` } );

		delete_comments_admin_del ( req, id, ( err: ILError, OK: boolean ) => {
			if ( err?.quiet ) return;
			if ( err ) return send_error( res, err );

			send_ok( res, { OK } );
		} );
	} );

};
