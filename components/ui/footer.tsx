import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'

export default function Footer() {
    return (
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
            <p>Powered by PROMOVE</p>
            <span className="border-l h-6" />
            <p>
                <a
                    href="mailto:promove.ufrj@gmail.com"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    <EmailIcon
                        sx={{ fontSize: '16px', marginRight: '.1rem' }}
                    />
                    promove.ufrj@gmail.com
                </a>
            </p>
            <p>
                <a
                    href="mailto:promove.ufrj@gmail.com"
                    target="_blank"
                    className="font-bold hover:underline flex gap-1 "
                    rel="noreferrer"
                >
                    <InstagramIcon
                        sx={{ fontSize: '16px', marginRight: '.1rem' }}
                    />
                    @promove.ufrj
                </a>
            </p>
        </footer>
    )
}
