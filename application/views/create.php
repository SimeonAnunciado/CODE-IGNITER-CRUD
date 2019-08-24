<?php require_once('header.php'); ?>

<div id="container">
	<div class="row" style="margin-top: 100px;">
		<div class="col-md-4"></div>
		<div class="col-md-4">


			<?php echo form_open('home/save'); ?>
				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" class="form-control" id="name" name="name">
				</div>
				<?php echo form_error('name','<p class="text text-danger">','</p>'); ?>

				<div class="form-group">
					<label for="age">Age</label>
					<input type="number" class="form-control" id="age" name="age">
				</div>
				<?php echo form_error('age','<p class="text text-danger">','</p>'); ?>
				<div class="form-group">
					<label for="address">Address</label>
					<input type="text" class="form-control" id="address" name="address">
				</div>
				<?php echo form_error('address','<p class="text text-danger">','</p>'); ?>

				<?php echo form_submit('create_submit', 'Create!' , array('class' => 'btn btn-default')); ?>

			<?php echo form_close(); ?>
		<div class="col-md-4"></div>
	</div>
	
</div>
<?php require_once('footer.php'); ?>

