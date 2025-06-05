import { Box } from "@mui/material";
import { HeaderNfeForms } from "../../components/Nfe/HeaderNfeForms/HeaderNfeForms";
import { CustomTabs } from "../../components/Nfe/CustomTabs/CustomTabs";

const itensTabs = [
  "Identificação",
  "Emitente",
  "Destinatário",
  "Produtos",
  "Impostos",
  "Transporte",
  "Pagamento",
  "Exportação",
  "Cobrança",
  "Informações Adicionais",
]

export default function NfeEmitirPage() {
  return(
   <Box>
    <HeaderNfeForms />
    <CustomTabs labels={itensTabs} quantity={itensTabs.length} value={itensTabs.length}/>
   </Box>
  )

}