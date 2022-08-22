import { KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import useClickOutside from 'finpoq/hooks/use-click-outside'
import { useUiDispatch } from 'finpoq/store/ui/ui-provider'
import ArrowLeft from 'finpoq/assets/icons/arrow-left'
import Close from 'finpoq/assets/icons/close'
import useBlockScroll from 'finpoq/hooks/use-block-scroll'

interface ModalProps {
  goBack?: number
  closeModalIcon?: boolean
  modalTitle?: string
  children: ReactNode
}

const Modal = ({ closeModalIcon = true, modalTitle, children, goBack = 1 }: ModalProps) => {
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>()
  const modal = useRef<HTMLDivElement | null>(null)
  const { closeModal } = useUiDispatch()
  const [blockScroll, allowScroll] = useBlockScroll()

  useClickOutside(
    modal,
    useCallback(() => closeModal(goBack), [closeModal, goBack])
  )

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeModal(goBack)
    }
  }

  useEffect(() => {
    blockScroll()
    return () => allowScroll()
  }, [allowScroll, blockScroll])

  const heighFixed = modalRef && modalRef.offsetHeight > window.innerHeight * 0.6

  if (!children) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-screen md:flex md:items-center md:justify-center md:py-10"
      // dark-mode
      style={{ backgroundColor: 'rgb(0, 0, 0, 0.2)' }}
      ref={(newRef) => setModalRef(newRef)}
      onKeyDown={(e) => handleKeyPress(e)}
    >
      <div
        className={`animate-modal dark:bg-dark dark:border-dark-line fixed top-0 left-0 right-0 z-50 flex h-full flex-col bg-white pb-3 dark:border md:static md:mx-auto md:h-auto md:w-[30rem] md:rounded-lg ${
          heighFixed && 'md:h-[85vh]'
        }`}
        ref={modal}
      >
        <div className="flex h-14 w-full flex-shrink-0 items-center justify-between px-4">
          {goBack > 1 ? (
            <button onClick={() => closeModal(1)}>
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </button>
          ) : (
            <div />
          )}

          <div className="text-lg font-bold text-black">{modalTitle}</div>

          {closeModalIcon ? (
            <button onClick={() => closeModal(goBack)}>
              <Close className="h-6 w-6 text-gray-400" />
            </button>
          ) : (
            <div />
          )}
        </div>
        <div className="flex w-full flex-1 flex-col overflow-y-auto px-4 pt-2 md:rounded-lg">{children}</div>
      </div>
    </div>
  )
}

export default Modal
