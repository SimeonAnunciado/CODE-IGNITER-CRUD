<?php require_once('header.php'); ?>

<div id="container">
	<div class="row" style="margin-top: 100px;">
		<div class="col-md-4"></div>
		<div class="col-md-4">

			<?php if ($error = $this->session->flashdata('response')) : ?>

				<div class="alert alert-success"><?php echo $error;  ?></div>

			<?php endif ?>






			<div class="col-md-12">
				<?php echo anchor("home/create" , "Create User" , array('class' => 'btn btn-primary pull-left')); ?>
				<br><br>
			</div>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th class="text-center">Name</th>
						<th class="text-center">Age</th>
						<th class="text-center">Address</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					<?php if(count($record) > 0 ): ?>
					<?php foreach ($record as $user) : ?>
						<tr>
							<td class="text-center"><?php echo $user->name; ?></td>
							<td class="text-center"><?php echo $user->age; ?></td>
							<td class="text-center"><?php echo $user->address; ?></td>
							<td class="text-center"><?php echo anchor("home/edit/{$user->id}","View", array("class" => "btn btn-success") )?> &nbsp; 
								<?php echo anchor("home/delete/{$user->id}","Remove", array("class" => "btn btn-danger") )?>
						</tr>
					<?php endforeach ?>
					<?php else : ?>
						<tr>
							<td colspan="300" align="center">No Data Found!</td>
						</tr>
					<?php endif ?>

				</tbody>
			</table>
		</div>
		<div class="col-md-4"></div>
	</div>
	
</div>
<?php require_once('footer.php'); ?>

