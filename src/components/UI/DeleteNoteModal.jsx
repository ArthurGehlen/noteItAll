import { Fragment } from "react";
function DeleteNoteModal() {
  <Fragment>
    <Button
      variant="outlined"
      color="danger"
      endDecorator={<DeleteForever />}
      onClick={() => setOpen(true)}
    >
      Discard
    </Button>
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Atenção
        </DialogTitle>
        <Divider />
        <DialogContent>
          Are you sure you want to discard all of your notes?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
            Discard notes
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  </Fragment>;
}

export default DeleteNoteModal;
