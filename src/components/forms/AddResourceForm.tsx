
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, Link as LinkIcon, YoutubeIcon, BookOpenCheck, Library } from "lucide-react";
import React, { useState, useEffect } from "react";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
];
const ACCEPTED_FILE_EXTENSIONS_STRING = ".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .webp, .gif, .mp4, .ppt, .pptx";


const addResourceFormSchema = z.object({
  resourceTitle: z.string().min(3, { message: "Resource title must be at least 3 characters." }),
  resourceFiles: z
    .custom<FileList>((val) => val instanceof FileList, "Please select files to upload.")
    .refine((files) => files.length > 0, "Please select at least one file.")
    .refine(
      (files) => Array.from(files).every((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
      `Accepted file types: ${ACCEPTED_FILE_EXTENSIONS_STRING}`
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE_BYTES),
      `Each file size must be ${MAX_FILE_SIZE_MB}MB or less.`
    )
    .optional(),
  youtubeLink: z.string().url({ message: "Please enter a valid YouTube URL." }).optional().or(z.literal('')),
  youtubeTopic: z.string().optional(),
  nptelLink: z.string().url({ message: "Please enter a valid NPTEL URL." }).optional().or(z.literal('')),
  edxLink: z.string().url({ message: "Please enter a valid edX URL." }).optional().or(z.literal('')),
  ndliLink: z.string().url({ message: "Please enter a valid NDLI URL." }).optional().or(z.literal('')),
  otherWebsiteLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  linkDescription: z.string().optional(),
});

type AddResourceFormValues = z.infer<typeof addResourceFormSchema>;

interface AddResourceFormProps {
  categoryName: string;
}

export function AddResourceForm({ categoryName }: AddResourceFormProps) {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<AddResourceFormValues>({
    resolver: zodResolver(addResourceFormSchema),
    defaultValues: {
      resourceTitle: "",
      resourceFiles: undefined,
      youtubeLink: "",
      youtubeTopic: "",
      nptelLink: "",
      edxLink: "",
      ndliLink: "",
      otherWebsiteLink: "",
      linkDescription: "",
    },
  });

  const handleDrag = (e: React.DragEvent<HTMLDivElement | HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement | HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      form.setValue("resourceFiles", e.dataTransfer.files);
      form.trigger("resourceFiles"); // Manually trigger validation
    }
  };


  function onSubmit(data: AddResourceFormValues) {
    console.log("Resource Data Submitted for category:", categoryName, data);
    if (data.resourceFiles && data.resourceFiles.length > 0) {
      Array.from(data.resourceFiles).forEach(file => {
        console.log("Uploaded file:", file.name, file.size, file.type);
      });
    }
    toast({
      title: "Resource Submitted (Demo)",
      description: `Your resource for ${categoryName} has been submitted for review. This is a demo; data is not saved.`,
      variant: "default",
    });
    form.reset();
  }

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <Card className="w-full shadow-lg mt-12 border-accent/50">
      <CardHeader>
        <CardTitle className="text-xl font-headline text-accent">Add New Resource to {categoryName}</CardTitle>
        <CardDescription>Upload files or provide links to educational materials. (Backend saving not implemented yet)</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="resourceTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Title / Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Introduction to Algebra, Chapter 1 Notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resourceFiles"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel>Upload Files (Drag & Drop or Click)</FormLabel>
                  <FormControl>
                    <label
                      htmlFor="dropzone-file"
                      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors ${
                        dragActive ? "border-primary" : "border-border"
                      }`}
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className={`w-10 h-10 mb-3 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`mb-2 text-sm ${dragActive ? "text-primary" : "text-muted-foreground"}`}>
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          {ACCEPTED_FILE_EXTENSIONS_STRING} (MAX {MAX_FILE_SIZE_MB}MB each)
                        </p>
                         {form.watch("resourceFiles") && form.watch("resourceFiles")!.length > 0 && (
                          <p className="text-xs text-accent mt-2">
                            {form.watch("resourceFiles")!.length} file(s) selected: {Array.from(form.watch("resourceFiles")!).map(f => f.name).join(", ")}
                          </p>
                        )}
                      </div>
                      <Input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept={ACCEPTED_FILE_EXTENSIONS_STRING}
                        multiple
                        onChange={(e) => {
                          onChange(e.target.files);
                        }}
                        onBlur={onBlur}
                        name={name}
                        ref={ref}
                      />
                    </label>
                  </FormControl>
                  <FormDescription>
                    Upload relevant documents, presentations, images, or short video clips.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-md font-medium text-primary border-b pb-2">Or Add Links from External Sources</h3>
              <FormField
                control={form.control}
                name="youtubeLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><YoutubeIcon className="mr-2 h-5 w-5 text-red-600" /> YouTube Link (Optional)</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://www.youtube.com/watch?v=..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="youtubeTopic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube Video Topic/Description (if link provided)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Specific concept covered in the video" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nptelLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><BookOpenCheck className="mr-2 h-5 w-5 text-blue-600" /> NPTEL Course Link (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://nptel.ac.in/courses/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="edxLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><BookOpenCheck className="mr-2 h-5 w-5 text-red-700" /> edX Course Link (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://www.edx.org/course/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ndliLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Library className="mr-2 h-5 w-5 text-orange-600" /> National Digital Library of India (NDLI) Link (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://ndl.iitkgp.ac.in/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="otherWebsiteLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><LinkIcon className="mr-2 h-5 w-5 text-gray-600" /> Other Website Link (Optional)</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://www.example-resource.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description for Links (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the linked resource, e.g., 'Excellent tutorial on calculus basics'" {...field} rows={3}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              Add Resource to {categoryName}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    