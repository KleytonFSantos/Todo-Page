import Icon from '../assets/Icon'
import { Popover } from '@headlessui/react'

export default function Example() {
  return (
    <Popover className="relative bg-slate-800 flex justify-center">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6">
            <div className="flex items-center justify-center">
              <Icon />
            </div>
      </div>        
    </Popover>
  )
}
