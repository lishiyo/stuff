json.array! @all_comments do |comm|

		json.id comm.id
		json.commentable_id comm.commentable_id
		json.commentable_type comm.commentable_type
		json.body comm.body
		json.parent_id comm.parent_id
		json.user_id comm.user_id
		json.lft comm.lft
		json.rgt comm.rgt
		json.child_comments comm.children

end

