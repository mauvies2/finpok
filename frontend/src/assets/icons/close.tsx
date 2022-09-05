interface Props {
  className?: string
}

const Close = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-8 w-8 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default Close
