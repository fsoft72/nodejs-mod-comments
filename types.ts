/* Types file generated by flow2code */

/*=== f2c_start __file ===*/

/*=== f2c_end __file ===*/
/** CommentType */
export interface CommentType {
	/** Unique comment identifier */
	id: string;
	/** Domain identifier */
	domain: string;
	/** Module identifier */
	module: string;
	/** Object identifier */
	id_obj: string;
	/** User identifier */
	id_user: string;
	/** Comment visibility */
	visible: boolean;
	/** Comment text content */
	text: string;
}

export const CommentTypeKeys = {
	'id': { type: 'string', priv: false },
	'domain': { type: 'string', priv: false },
	'module': { type: 'string', priv: false },
	'id_obj': { type: 'string', priv: false },
	'id_user': { type: 'string', priv: false },
	'visible': { type: 'boolean', priv: false },
	'text': { type: 'string', priv: false },
};

