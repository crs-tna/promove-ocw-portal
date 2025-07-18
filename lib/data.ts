// Create database interactions here and import them in client files

import { createClient } from './supabase/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const supabase = createClient()

// ---- EXAMPLES ---- //
// export async function fetchRevenue() {
//     const { data, error } = await supabase.from('revenue').select('*')

//     if (error) {
//         console.error('Database Error:', error)
//         throw new Error('Failed to fetch revenue data.')
//     }

//     return data
// }

// export async function fetchLatestInvoices() {
//     const { data, error } = await supabase
//         .from('invoices')
//         .select('amount, id, customers(name, image_url, email)')
//         .order('date', { ascending: false })
//         .limit(5)

//     if (error) {
//         console.error('Database Error:', error)
//         throw new Error('Failed to fetch the latest invoices.')
//     }

//     return data.map((invoice) => ({
//         ...invoice,
//         amount: formatCurrency(invoice.amount),
//     }))
// }

// TODO: fetchUserDataById

// TODO: fetchCourseList

// TODO: fetchCourseByUser

// TODO: fetchCourseByProfessor

// TODO: fetchCourseById

// TODO: fetchContentByCourse

// TODO: come up with whatever else
