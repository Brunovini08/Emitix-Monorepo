"use client";

import { z } from "zod";
import { ide } from "./interfaces/identifierInterfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CustomInput } from "../../../CustomComponents/CustomInput";
import { green500 } from "../../../../utils/colors";

export type NfeFormIdentifier = z.infer<typeof ide>;

export function IdentifierForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NfeFormIdentifier>({
    resolver: zodResolver(ide),
  });

  const onSubmit = (data: NfeFormIdentifier) => {
    console.log("Dados validados: ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        padding: "16px",
        backgroundColor: "#f5f5f5",
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={"bold"}
        sx={{ marginBottom: "5px" }}
        color="primary"
      >
        Dados da Nota Fiscal
      </Typography>
      <Grid container spacing={2}>
        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary">Código UF</Typography>
            <TextField
              {...register("cUF")}
              variant="outlined"
              color="secondary"
            />
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary">Natureza da Operação</Typography>
            <TextField {...register("natOp")} color="secondary" />
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Modelo
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"55"}>55</MenuItem>
              <MenuItem value={"65"}>65</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary">Série</Typography>
            <TextField {...register("natOp")} color="secondary" />
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Tipo de Nota Fiscal
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={0}>Entrada</MenuItem>
              <MenuItem value={1}>Saída</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Identificação do Destinatário
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"1"}>Operação interna</MenuItem>
              <MenuItem value={"2"}>Operação interestadual</MenuItem>
              <MenuItem value={"3"}>Operação com exterior</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary">Código do Município</Typography>
            <TextField {...register("natOp")} color="secondary" />
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Tipo de Impressão
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"0"}>Sem DANFE</MenuItem>
              <MenuItem value={"1"}>DANFe Retrato</MenuItem>
              <MenuItem value={"2"}>DANFe Paisagem</MenuItem>
              <MenuItem value={"3"}>DANFe Simplificado</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Tipo de Emissão
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"1"}>Emissão Normal</MenuItem>
              <MenuItem value={"2"}>Contingência FS</MenuItem>
              <MenuItem value={"3"}>Regime Especial NFF</MenuItem>
              <MenuItem value={"4"}>Contingência DPEC</MenuItem>
              <MenuItem value={"5"}>Contingência FSDA</MenuItem>
              <MenuItem value={"7"}>Contingência SVC-AN</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Tipo de Ambiente
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"1"}>Produção</MenuItem>
              <MenuItem value={"2"}>Homologação</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Finalidade da Nota Fiscal
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"1"}>NF-e Normal</MenuItem>
              <MenuItem value={"2"}>NF-e Complementar</MenuItem>
              <MenuItem value={"3"}>NF-e de Ajuste</MenuItem>
              <MenuItem value={"4"}>NF-e de Devolução</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Indicador Final
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"0"}>Normal</MenuItem>
              <MenuItem value={"1"}>Consumidor Final</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Indicador de Presença
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"0"}>Não se Aplica</MenuItem>
              <MenuItem value={"1"}>Presencial</MenuItem>
              <MenuItem value={"2"}>Não presencial</MenuItem>
              <MenuItem value={"3"}>Internet</MenuItem>
              <MenuItem value={"4"}>Telefone</MenuItem>
              <MenuItem value={"5"}>Fax</MenuItem>
              <MenuItem value={"9"}>Outros</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Indicador de Intermediador / Marketplace
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"0"}>Normal</MenuItem>
              <MenuItem value={"1"}>Intermediário</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth>
            <Typography color="secondary" id="modelo-label">
              Indicador de Intermediador / Marketplace
            </Typography>
            <Select
              labelId="modelo-label"
              label="Modelo"
              id="modelo"
              {...register("mod")}
              color="secondary"
            >
              <MenuItem value={"0"}>Aplicativo da SEF</MenuItem>
              <MenuItem value={"1"}>Aplicativo de Terceiros</MenuItem>
              <MenuItem value={"2"}>Aplicativo do contribuinte com aplicativo da SEFAZ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
