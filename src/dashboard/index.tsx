import GradientBackgroundContainer from '@/components/GradientBackgroundContainer'
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Smart file type selection',
    description:
      'Quickly choose the file type you need. The system automatically matches the correct data structure — no manual formatting required.',
    icon: CloudArrowUpIcon
  },
  {
    name: 'Excel report generation',
    description:
      'Upload your Excel file and instantly generate a structured report. Save time and boost productivity.',
    icon: LockClosedIcon
  },
  {
    name: 'Flexible templates',
    description:
      'Choose from multiple report templates with customizable fields and layout options — tailored to your business needs.',
    icon: ArrowPathIcon
  },
  {
    name: 'Reliable data handling',
    description:
      'All data is processed locally on your desktop, ensuring privacy and security without exposing sensitive information.',
    icon: FingerPrintIcon
  }
]

export default function Dashboard() {
  return (
    <GradientBackgroundContainer className="bg-white w-full h-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Generate reports faster
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to generate reports from Excel
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Easily select the file type and upload an Excel file — your report
            will be generated automatically. Streamline your data workflow with
            minimal effort.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </GradientBackgroundContainer>
  )
}
