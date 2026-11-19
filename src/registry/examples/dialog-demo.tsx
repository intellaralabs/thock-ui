import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Changes are saved to your account when you press save.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <FormField label="Name"><Input defaultValue="Sam Carter" /></FormField>
          <FormField label="Handle"><Input defaultValue="@samcarter" /></FormField>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <DialogClose asChild><Button variant="accent">Save</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
