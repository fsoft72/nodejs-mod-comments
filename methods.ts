/*
 * This file has been generated by flow2code
 * See: https://flow.liwe.org
 */

import { ILRequest, ILResponse, LCback, ILiweConfig, ILError, ILiWE } from '../../liwe/types';
import { $l } from '../../liwe/locale';
import { system_permissions_register } from '../system/methods';

import {
	Comment, CommentKeys,
} from './types';

import _module_perms from './perms';

let _liwe: ILiWE = null;

const _ = ( txt: string, vals: any = null, plural = false ) => {
	return $l( txt, vals, plural, "comments" );
};

const COLL_COMMENTS = "comments";

/*=== f2c_start __file_header === */
import { system_domain_get_by_session } from '../system/methods';
import { adb_collection_init, adb_del_one, adb_find_all, adb_find_one, adb_record_add } from '../../liwe/db/arango';
import { mkid } from '../../liwe/utils';
/*=== f2c_end __file_header ===*/

// {{{ post_comments_add ( req: ILRequest, module: string, id_obj: string, text: string, visible?: boolean, cback: LCBack = null ): Promise<Comment>
/**
 *
 * # Add Comment
 * Creates a new comment for a specific object.
 * ## Operations
 * - Validate input parameters
 * - Check if target object exists
 * - Generate unique comment ID
 * - Save comment to database
 * - Return created comment object
 *
 * @param module - Module identifier [req]
 * @param id_obj - Object identifier [req]
 * @param text - Comment text content [req]
 * @param visible - Comment visibility [opt]
 *
 * @return comment: Comment
 *
 */
export const post_comments_add = ( req: ILRequest, module: string, id_obj: string, text: string, visible?: boolean, cback: LCback = null ): Promise<Comment> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start post_comments_add ===*/
		const err: ILError = { message: "Error adding comment" };
		const id_user = req.user.id;
		const id = mkid( 'comment' );
		const res = await adb_record_add( req.db, COLL_COMMENTS, { id, module, id_obj, text, id_user, visible: visible || true } );
		if ( !res ) {
			return cback ? cback( err.message ) : reject( err.message );
		}

		return cback ? cback( null, res ) : resolve( res );
		/*=== f2c_end post_comments_add ===*/
	} );
};
// }}}

// {{{ delete_comments_delete ( req: ILRequest, id: string, cback: LCBack = null ): Promise<boolean>
/**
 *
 * # Delete Comment
 * Deletes an existing comment.
 * ## Operations
 * - Check if comment exists
 * - Verify user owns comment
 * - Remove comment from database
 *
 * @param id - Comment identifier [req]
 *
 * @return ok: boolean
 *
 */
export const delete_comments_delete = ( req: ILRequest, id: string, cback: LCback = null ): Promise<boolean> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start delete_comments_delete ===*/
		const domain = await system_domain_get_by_session( req );
		const id_user = req.user.id;

		const res = await adb_del_one( req.db, COLL_COMMENTS, { id, id_user, domain: domain.code } );
		/*=== f2c_end delete_comments_delete ===*/
	} );
};
// }}}

// {{{ get_comments_admin_list ( req: ILRequest, module?: string, cback: LCBack = null ): Promise<Comment[]>
/**
 *
 * @param module - comments module related [opt]
 *
 * @return comments: Comment
 *
 */
export const get_comments_admin_list = ( req: ILRequest, module?: string, cback: LCback = null ): Promise<Comment[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start get_comments_admin_list ===*/
		const err: ILError = { message: "Error listing comments" };
		const domain = await system_domain_get_by_session( req );
		const filter: { domain: string; module?: string; } = { domain: domain.code };
		if ( module ) {
			filter.module = module;
		}

		const comments = await adb_find_all( req.db, COLL_COMMENTS, filter, CommentKeys );

		if ( !comments ) {
			return cback ? cback( err.message ) : reject( err.message );
		}

		return cback ? cback( null, comments ) : resolve( comments );
		/*=== f2c_end get_comments_admin_list ===*/
	} );
};
// }}}

// {{{ delete_comments_admin_del ( req: ILRequest, id: string, cback: LCBack = null ): Promise<boolean>
/**
 *
 * @param id - Comment's ID [req]
 *
 * @return OK: boolean
 *
 */
export const delete_comments_admin_del = ( req: ILRequest, id: string, cback: LCback = null ): Promise<boolean> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start delete_comments_admin_del ===*/
		const domain = await system_domain_get_by_session( req );

		const res = await adb_del_one( req.db, COLL_COMMENTS, { id, domain: domain.code } );
		/*=== f2c_end delete_comments_admin_del ===*/
	} );
};
// }}}

// {{{ comments_list ( req: ILRequest, id_obj: string, module: string, cback: LCBack = null ): Promise<Comment[]>
/**
 *
 * # List Comments
 * Returns all visible comments for a specific object identified by domain, module and object ID.
 * ## Operations
 * - Check if object exists
 * - Filter visible comments only
 * - Sort by creation date descending
 * - Return comments array
 *
 * @param req -  [req]
 * @param id_obj - ID Object [req]
 * @param module - Module [req]
 *
 * @return : Comment
 *
 */
export const comments_list = ( req: ILRequest, id_obj: string, module: string, cback: LCback = null ): Promise<Comment[]> => {
	return new Promise( async ( resolve, reject ) => {
		/*=== f2c_start comments_list ===*/
		const err: ILError = { message: "Error listing comments" };
		const comments = await adb_find_all( req.db, COLL_COMMENTS, { id_obj, module, visible: true }, CommentKeys );
		if ( !comments ) {
			return cback ? cback( err.message ) : reject( err.message );
		}
		return cback ? cback( null, comments ) : resolve( comments );
		/*=== f2c_end comments_list ===*/
	} );
};
// }}}

// {{{ comments_db_init ( liwe: ILiWE, cback: LCBack = null ): Promise<boolean>
/**
 *
 * Initializes the module's database
 *
 * @param liwe - The Liwe object [req]
 *
 * @return : boolean
 *
 */
export const comments_db_init = ( liwe: ILiWE, cback: LCback = null ): Promise<boolean> => {
	return new Promise( async ( resolve, reject ) => {
		_liwe = liwe;

		system_permissions_register( 'comments', _module_perms );

		await adb_collection_init( liwe.db, COLL_COMMENTS, [
			{ type: "persistent", fields: [ "id" ], unique: true },
			{ type: "persistent", fields: [ "domain" ], unique: false },
			{ type: "persistent", fields: [ "module" ], unique: false },
			{ type: "persistent", fields: [ "id_obj" ], unique: false },
			{ type: "persistent", fields: [ "id_user" ], unique: false },
			{ type: "persistent", fields: [ "visible" ], unique: false },
			{ type: "fulltext", fields: [ "text" ], unique: false },
		], { drop: false } );

		/*=== f2c_start comments_db_init ===*/

		/*=== f2c_end comments_db_init ===*/
	} );
};
// }}}


