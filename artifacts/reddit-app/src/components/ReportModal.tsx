import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useReportPost } from "@workspace/api-client-react";
import { useState } from "react";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  postId: number;
}

export function ReportModal({ open, onClose, postId }: ReportModalProps) {
  const reportPost = useReportPost();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) { toast.error("Select a reason"); return; }
    reportPost.mutate({ id: postId, data: { reason, details: details || null } }, {
      onSuccess: () => { toast.success("Report submitted"); onClose(); },
      onError: () => toast.error("Failed to submit report"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Report Post</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label>Reason</Label>
            <Select onValueChange={setReason}>
              <SelectTrigger data-testid="select-report-reason"><SelectValue placeholder="Select a reason" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="misinformation">Misinformation</SelectItem>
                <SelectItem value="hate_speech">Hate Speech</SelectItem>
                <SelectItem value="violence">Violence</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Additional Details (optional)</Label>
            <Textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Provide more context..." data-testid="input-report-details" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={reportPost.isPending} data-testid="button-submit-report">Submit Report</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
