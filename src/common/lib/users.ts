import { createClient } from './supabase/client'

const supabase = createClient()

export async function getUserIdByName(userName: string) {
  const { data, error } = await supabase
    .from("users")       // <- tabela onde estão os usuários
    .select("id")        // só precisamos do id
    .eq("first_name", userName) // filtro pelo nome
    .single()            // garante que vem só 1 registro

if (error) {
    console.error("Erro ao buscar usuário:", error)
    return null // não undefined!
  }

  if (!data) return null
  return { id: data.id }
}
