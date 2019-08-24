<?php 

class Home extends CI_controller{

	public function index(){
	
		$data = $this->crud_model->getUser();
		
		$this->load->view('home',array('record' => $data));
	}

	public function create(){
		$this->load->view('create');
	}

	public function save(){
		
		$this->form_validation->set_rules('name', 'Name', 'required');
		$this->form_validation->set_rules('age', 'Age', 'required');
		$this->form_validation->set_rules('address', 'Address ', 'required');
	
		if ($this->form_validation->run() ){
			$data_post = array(
							'name' => $this->input->post('name'),
							'age' =>  $this->input->post('age'),
							'address' => $this->input->post('address')
							);

			if($this->crud_model->saveRecord($data_post)){
				$this->session->set_flashdata('response','success');
			}else{
				$this->session->set_flashdata('response','failed to save');
			}
			 redirect('home');
		}else{
			$this->load->view('create');
		}
	}



	public function edit($id = ''){
		$edit_data = $this->crud_model->edit($id);

		$this->load->view('update',array('user' => $edit_data));
	}

	public function update($id = ''){
		$this->form_validation->set_rules('name', 'Name', 'required');
		$this->form_validation->set_rules('age', 'Age', 'required');
		$this->form_validation->set_rules('address', 'Address ', 'required');
	
		if ($this->form_validation->run() ){
			$data_post = array(
							'name' => $this->input->post('name'),
							'age' =>  $this->input->post('age'),
							'address' => $this->input->post('address')
							);

			if($this->crud_model->update_model($id,$data_post)){
				$this->session->set_flashdata('response','success update');
			}else{
				$this->session->set_flashdata('response','some data already exist');
			}
			 redirect('home');
		}else{
			$this->load->view('update');
		}
	}

	public function delete($id = ''){
		if($this->crud_model->delete_user($id)){
			$this->session->set_flashdata('response','success delete record');
		}else{
			$this->session->set_flashdata('response','Error Something went wrong');
		}
		redirect('home');

	}
}

?>