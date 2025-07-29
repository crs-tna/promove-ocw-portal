import { SignUpForm } from '@/src/components/sign-up-form'

export default function Page() {
    return (
        <div className="h-svh w-full flex justify-center items-center p-6 md:p-10">
            <div className="w-full max-w-md">
                <SignUpForm />
            </div>
        </div>
    )
}
