
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        
        <Alert className="mb-8">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Find answers to the most common questions about using Skanam.lv.
          </AlertDescription>
        </Alert>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Skanam.lv?</AccordionTrigger>
            <AccordionContent>
              Skanam.lv is a platform for singing enthusiasts to discover and participate in singing events, as well as search, manage, and share song lyrics. It brings together singers, event organizers, and lyricists in one community.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need an account to use Skanam.lv?</AccordionTrigger>
            <AccordionContent>
              You can browse public events and songs without an account. However, to create your own events, add songs, or interact with other users, you'll need to register for a free account.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I create a singing event?</AccordionTrigger>
            <AccordionContent>
              After logging in, navigate to "My Events" and click the "Create New Event" button. Fill in the event details including title, description, date/time, location, and whether it's public or private.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I add song lyrics with copyright protection?</AccordionTrigger>
            <AccordionContent>
              No, Skanam.lv does not allow copyrighted content without proper permissions. You can add original lyrics, public domain works, or content where you have explicit permission from the copyright holder.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>What's the difference between public and private events/songs?</AccordionTrigger>
            <AccordionContent>
              Public events and songs are visible to all users on Skanam.lv. Private events and songs are only visible to you and can be useful for personal practice or planning.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger>How do I add YouTube or Vimeo links to my songs?</AccordionTrigger>
            <AccordionContent>
              When creating or editing a song, you can add media links in the dedicated field. Simply paste the YouTube or Vimeo URL and our system will automatically process it for embedding.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger>Is Skanam.lv available in other languages?</AccordionTrigger>
            <AccordionContent>
              Currently, Skanam.lv is available in English and Latvian. You can switch between languages using the language toggle in the footer of any page.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger>How can I report inappropriate content?</AccordionTrigger>
            <AccordionContent>
              If you come across inappropriate content, please use the "Send Feedback" link in the footer (requires login) and provide details about the content. Our moderation team will review it promptly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
