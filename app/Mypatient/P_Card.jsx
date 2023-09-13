import { Card, Text } from "@mantine/core";
import * as React from "react";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function P_Card() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Card className="w-4/5 flex flex-row justify-between bg-[#b2f5ea] font-semibold mb-[5px] mx-[10%] py-[10px] pl-[30px] pr-[10px] rounded-[10px] text-[#319795]">
        <div>
          <div>
            <span>Name: </span>
            <span>ณัฐพล สายทอง</span>
          </div>
          <div className="mt-[1px]">
            <span>ID: </span>
            <span>1XXXXXXXXXXXX</span>
          </div>
          <div className="mt-[1px]">
            <span>Status: </span>
            <span>O</span>
          </div>
        </div>
        <Button onClick={handleClickOpen}>
          <DeleteOutlineIcon
            sx={{ fontSize: "30px" }}
            style={{ color: "#319795" }}
          />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"ลบคนไข้"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Name: นาย ณัฐพล สายทอง
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              ID: 1XXXXXXXXXXXX
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Status
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              ยกเลิก
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="success"
              autoFocus
            >
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
