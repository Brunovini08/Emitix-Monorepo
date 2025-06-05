import { Box } from "@mui/material";
import { HeaderNfeForms } from "../../components/Nfe/HeaderNfeForms/HeaderNfeForms";
import { CustomTabs } from "../../components/Nfe/CustomTabs/CustomTabs";

const itensTabs = [
  {
    label: "Identificação",
    content: <div>oi</div>
  },
  {
    label: "Emitente",
    content: <div>oi</div>
  },
  {
    label: "Destinatário",
    content: <div>oi</div>
  },
  {
    label: "Produtos",
    content: <div>oi</div>
  },
  {
    label: "Impostos",
    content: <div>oi</div>
  },
  {
    label: "Transporte",
    content: <div>oi</div>
  },
  {
    label: "Pagamento",
    content: <div>oi</div>
  },
  {
    label: "Exportação",
    content: <div>oi</div>
  },
  {
    label: "Cobrança",
    content: <div>oi</div>
  },
  {
    label: "Informações Adicionais",
    content: <div>oi</div>
  },
]

export default function NfeEmitirPage() {
  return(
   <Box
    sx={{
      backgroundColor: '#f6f6f6',
      width: '100%',
      minHeight: '100vh'
    }}
   >
    <HeaderNfeForms />
    <CustomTabs tabs={itensTabs}/>
   </Box>
  )

}