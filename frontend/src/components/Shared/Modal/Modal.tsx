import { ReactNode, FC } from 'react'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'

interface ModalProps {
  arrowBack?: boolean
  closeModalIcon?: boolean
  modalTitle?: string
  section?: string
  children: ReactNode
}

const Modal: FC<ModalProps> = ({
  arrowBack = true,
  closeModalIcon = true,
  modalTitle,
  children,
  section = '',
}) => {
  const { modal } = useUiState()
  const { closeModal } = useUiDispatch()

  if (modal !== section) return null

  return (
    <section className="fixed top-0 left-0 right-0 h-screen bg-white z-50 flex flex-col items-center">
      <div className="flex justify-between items-center h-16 px-6 w-full flex-shrink-0">
        {arrowBack ? (
          <button onClick={() => closeModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        ) : (
          <div />
        )}
        <div className="font-bold text-black text-lg">{modalTitle}</div>
        {closeModalIcon ? (
          <button onClick={() => closeModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <div />
        )}
      </div>
      <div className="bg-light-gray w-full h-full p-4">{children}</div>
    </section>
  )
}

export default Modal
