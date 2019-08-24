<?php 

class Crud_model extends CI_model{

	public function getUser(){
		$query = $this->db->get("users");
			return $query->result();
	}


	public function saveRecord($data){
		
			return  $this->db->insert('users' , $data);

	}
	public function edit($id){
		$query = $this->db->get_where('users', array('id' => $id));

		if ($query->num_rows() > 0 ) {
			return $query->row();
		}
	}

	public function update_model($id, $data){
		$query = $this->db->where('id', $id)->update('users', $data);
		return $query;
	}

	public function delete_user($id){
		$query = $this->db->delete('users', array('id' => $id));
		return $query;
	}

	
}

 ?>