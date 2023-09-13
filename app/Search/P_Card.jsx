import { Card } from "@mantine/core";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";

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
      <Card className="w-4/5 flex flex-row justify-between bg-[#BFDBFE] font-semibold mb-[5px] mx-[10%] pl-[30px] pr-[20px] rounded-[10px] text-[#2563EB]">
        <div className="PText">
          <div className="mt-[10px]">
            <span className="NameTitle">Name: </span>
            <span className="PNameText">ณัฐพล สายทอง</span>
          </div>
          <div className="mt-[1px] mb-[10px]">
            <span className="IDText">ID: </span>
            <span className="IDNo">XXXXXXXXXX</span>
          </div>
        </div>
        <div className="py-[10px]">
          <CheckIcon sx={{ fontSize: "45px" }} style={{ color: "#2563EB" }} />
        </div>
      </Card>
      <Card className="w-4/5 flex flex-row justify-between bg-[#BFDBFE] font-semibold mb-[5px] mx-[10%] pl-[30px] rounded-[10px] text-[#2563EB]">
        <div className="PText">
          <div className="mt-[10px]">
            <span className="NameTitle">Name: </span>
            <span className="PNameText">ณัฐพล สายทอง</span>
          </div>
          <div className="mt-[1px] mb-[10px]">
            <span className="IDText">ID: </span>
            <span className="IDNo">XXXXXXXXXX</span>
          </div>
        </div>
        <Button onClick={handleClickOpen}>
          <AddIcon sx={{ fontSize: "50px" }} style={{ color: "#2563EB" }} />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"เพิ่มคนไข้"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Name: ณัฐพล สายทอง
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              ID: 1XXXXXXXXXXXX
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              ยกเลิก
            </Button>
            <Button
              className="bg-[#08a638]"
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
