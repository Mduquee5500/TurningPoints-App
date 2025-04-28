// components/RecentFilesList.tsx

import { PaperClipIcon } from '@heroicons/react/16/solid'
import { formatDate } from '@/lib/utils.ts'
import { FileUploaderProps } from '@/upload-file'

const RecentFilesList = ({ files }: { files: FileUploaderProps[] | null }) => {
  return (
    <div className="w-full space-y-4">
      <dl className="text-md/6 font-medium text-gray-900">5 recently upload</dl>
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          {files?.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-400"
                />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">{item.filename}</span>
                  <span className="shrink-0 text-gray-400">
                    {formatDate(item.uploadtime)}
                  </span>
                </div>
              </div>
              <div className="ml-4 shrink-0">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Report
                </a>
              </div>
            </li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

export default RecentFilesList
