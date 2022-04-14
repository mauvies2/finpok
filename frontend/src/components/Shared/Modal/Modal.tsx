import { useUiDispatch } from 'finpok/store/ui/UiProvider'
import { ReactNode, FC } from 'react'

interface ModalProps {
  goBack?: number
  closeModalIcon?: boolean
  modalTitle?: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ closeModalIcon = true, modalTitle, children, goBack = 1 }) => {
  const { closeModal } = useUiDispatch()

  if (!children) return null

  return (
    <section className="fixed top-0 left-0 right-0 z-50 flex h-screen flex-col items-center bg-white">
      <div className="flex h-16 w-full flex-shrink-0 items-center justify-between px-6">
        {goBack > 1 ? (
          <button onClick={() => closeModal(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current text-gray-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        ) : (
          <div />
        )}
        <div className="text-lg font-bold text-black">{modalTitle}</div>
        {closeModalIcon ? (
          <button onClick={() => closeModal(goBack)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current text-gray-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <div />
        )}
      </div>
      <div className="bg-light-gray h-full w-full overflow-y-scroll p-4">{children}</div>
    </section>
  )
}

export default Modal
