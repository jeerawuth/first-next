import { Dialog } from '@headlessui/react'

export function MyDialog({isOpen, setIsOpen}) {
  function handleDeactivate() {
    alert('Confirm')
    setIsOpen(false)
  }
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                <Dialog.Title>My Dialog</Dialog.Title>
                <Dialog.Description>
                Confirm your dialog by click OK
                </Dialog.Description>
                <p>
                Are you sure you want to confirm your action?
                </p>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button onClick={handleDeactivate} className='font-bold underline'>OK</button>
            </Dialog.Panel>
        </div>
    </Dialog>
  )
}
