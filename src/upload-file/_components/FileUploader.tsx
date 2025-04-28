// components/FileUploader.tsx

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx'
import { filetypes } from '@/lib/mock.ts'
import { ParsedData } from '@/upload-file/fileType.ts'
import useHttp from '@/lib/use-http.ts'
import { processExcelFile } from '@/lib/excelProcessor.ts'
import toast from 'react-hot-toast'

const FileUploader = () => {
  const [upload, setUpload] = useState<ParsedData | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [fileType, setFileTye] = useState<string | null>(null)

  const { fetchData, loading } = useHttp()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setFile(file)
  }

  const handleFileTypeChange = async (value: string) => {
    if (!value) return
    setFileTye(value)
  }

  const processData = async () => {
    if (!file) return
    if (!fileType) return
    const res = await processExcelFile(file, fileType)
    console.log(res);
    
    setUpload(res)
  }

  // Handle file upload button click
  const upload_file = async () => {
    try {
      if (!file) {
        toast.error('Please upload a file')
        return
      }
      if (!fileType) {
        toast.error('Please select a file type')
        return
      }
      if (!upload) {
        toast.error('Please upload a file')
        return
      }
      const res = (await fetchData('file/upload', 'POST', upload)) as {
        message: string
      }
      toast.success(res.message)
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000);     
    } catch (error) {
      console.error('Error uploading file:', error)
      toast('Error uploading file')
    }
  }

  useEffect(() => {
    if (!file) return
    if (!fileType) return
    processData()
  }, [file, fileType])

  return (
    <div className="w-full grid gap-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer border border-input px-3 py-2 rounded-md shadow-sm text-center text-black"
      >
        {file?.name || 'Choose File'}
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx, .xls"
        className="hidden"
        onChange={handleFileUpload}
      />

      <Select onValueChange={handleFileTypeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select file type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Types</SelectLabel>
            {filetypes.map((type) => (
              <SelectItem
                key={type.id}
                value={type.name}
                className="text-black"
              >
                {type.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        disabled={loading}
        onClick={upload_file}
        className="bg-[#3e56b0] text-white hover:bg-[#4f6bcd] rounded-md px-4 py-2"
      >
        Upload
      </Button>
    </div>
  )
}

export default FileUploader
