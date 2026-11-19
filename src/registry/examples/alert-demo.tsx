import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Alert variant="info">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can add components with the CLI.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Deployed</AlertTitle>
        <AlertDescription>Production is running v2.4.0.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Trial ends in 3 days</AlertTitle>
        <AlertDescription>Add a payment method to keep your projects.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Payment declined</AlertTitle>
        <AlertDescription>Your card was declined. Try another one.</AlertDescription>
      </Alert>
    </div>
  );
}
