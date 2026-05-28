import React from 'react'
import type { ReactNode } from 'react'
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiFramer, SiNextdotjs, SiVite,
  SiDotnet, SiBlazor, SiSharp, SiQuarkus, SiSpringboot, SiNodedotjs, SiNestjs, SiPython,
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiSqlite,
  SiDocker, SiKubernetes,
  SiGit, SiGithub, SiGitlab,
  SiFigma, SiPostman, SiJest, SiJira, SiAxios,
  SiWordpress, SiLinux, SiReacthookform,
  SiMui, SiBootstrap, SiGraphql, SiPhp,
} from 'react-icons/si'
import {
  TbApi, TbShieldLock, TbDatabase, TbFaceId,
  TbBrandJavascript, TbFileSpreadsheet, TbFileTypePdf, TbQrcode,
  TbBrandVisualStudio, TbBrandCSharp, TbBrandAzure,
} from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'

interface IconMapEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any
  color: string
}

const ICON_MAP: Record<string, IconMapEntry> = {
  // ── JavaScript / TypeScript ─────────────────────────────────────
  'JavaScript':       { Component: SiJavascript,      color: '#F7DF1E' },
  'JS':               { Component: SiJavascript,      color: '#F7DF1E' },
  'JavaScript ES6+':  { Component: SiJavascript,      color: '#F7DF1E' },
  'TypeScript':       { Component: SiTypescript,       color: '#3178C6' },

  // ── Frontend ────────────────────────────────────────────────────
  'React':            { Component: SiReact,            color: '#61DAFB' },
  'React.js':         { Component: SiReact,            color: '#61DAFB' },
  'HTML5':            { Component: SiHtml5,            color: '#E34F26' },
  'HTML5 / CSS3':     { Component: SiHtml5,            color: '#E34F26' },
  'CSS3':             { Component: SiCss,              color: '#1572B6' },
  'CSS':              { Component: SiCss,              color: '#1572B6' },
  'Tailwind CSS':     { Component: SiTailwindcss,      color: '#06B6D4' },
  'Tailwind':         { Component: SiTailwindcss,      color: '#06B6D4' },
  'Framer Motion':    { Component: SiFramer,           color: '#FF0055' },
  'Next.js':          { Component: SiNextdotjs,        color: '#FFFFFF' },
  'Vite':             { Component: SiVite,             color: '#646CFF' },
  'Material UI':      { Component: SiMui,              color: '#007FFF' },
  'Bootstrap':        { Component: SiBootstrap,        color: '#7952B3' },
  'GraphQL':          { Component: SiGraphql,          color: '#E10098' },
  'React Hook Form':  { Component: SiReacthookform,    color: '#EC5990' },

  // ── Backend ─────────────────────────────────────────────────────
  '.NET':             { Component: SiDotnet,           color: '#512BD4' },
  '.NET 8':           { Component: SiDotnet,           color: '#512BD4' },
  '.NET 8 / C#':      { Component: SiDotnet,           color: '#512BD4' },
  '.NET 8 (C#)':      { Component: SiDotnet,           color: '#512BD4' },
  'MAUI Blazor':      { Component: SiDotnet,           color: '#512BD4' },
  'ASP.NET Core':     { Component: SiDotnet,           color: '#512BD4' },
  'Blazor':           { Component: SiBlazor,           color: '#512BD4' },
  'Blazor Server':    { Component: SiBlazor,           color: '#512BD4' },
  'C#':               { Component: TbBrandCSharp,      color: '#239120' },
  'Java':             { Component: FaJava,             color: '#ED8B00' },
  'Java (Quarkus)':   { Component: FaJava,             color: '#ED8B00' },
  'Java/Quarkus':     { Component: FaJava,             color: '#ED8B00' },
  'Java / Quarkus':   { Component: FaJava,             color: '#ED8B00' },
  'Quarkus':          { Component: SiQuarkus,          color: '#4695EB' },
  'Spring Boot':      { Component: SiSpringboot,       color: '#6DB33F' },
  'Node.js':          { Component: SiNodedotjs,        color: '#339933' },
  'NestJS':           { Component: SiNestjs,           color: '#E0234E' },
  'Python':           { Component: SiPython,           color: '#3776AB' },
  'PHP':              { Component: SiPhp,              color: '#777BB4' },
  'WordPress':        { Component: SiWordpress,        color: '#21759B' },
  'WooCommerce':      { Component: SiWordpress,        color: '#21759B' },

  // ── APIs / Auth / Integration ───────────────────────────────────
  'APIs REST':        { Component: TbApi,              color: '#6366F1' },
  'REST API':         { Component: TbApi,              color: '#6366F1' },
  'JWT / Auth':       { Component: TbShieldLock,       color: '#FB923C' },
  'JWT':              { Component: TbShieldLock,       color: '#FB923C' },
  'Auth':             { Component: TbShieldLock,       color: '#FB923C' },
  'Axios':            { Component: SiAxios,            color: '#5A29E4' },
  'JS Interop':       { Component: TbBrandJavascript,  color: '#F7DF1E' },

  // ── Reporting / Files ────────────────────────────────────────────
  'Entity Framework': { Component: TbDatabase,         color: '#512BD4' },
  'Dapper':           { Component: TbDatabase,         color: '#512BD4' },
  'ClosedXML':        { Component: TbFileSpreadsheet,  color: '#217346' },
  'ClosedXML (Excel)': { Component: TbFileSpreadsheet, color: '#217346' },
  'QuestPDF':         { Component: TbFileTypePdf,      color: '#FF0000' },
  'QRCoder':          { Component: TbQrcode,           color: '#94A3B8' },
  'QR code':          { Component: TbQrcode,           color: '#94A3B8' },

  // ── Databases ───────────────────────────────────────────────────
  'SQL Server':       { Component: TbDatabase,         color: '#CC2927' },
  'Microsoft SQL Server': { Component: TbDatabase,     color: '#CC2927' },
  'PostgreSQL':       { Component: SiPostgresql,       color: '#4169E1' },
  'MySQL':            { Component: SiMysql,            color: '#4479A1' },
  'MongoDB':          { Component: SiMongodb,          color: '#47A248' },
  'Redis':            { Component: SiRedis,            color: '#DC382D' },
  'SQLite':           { Component: SiSqlite,           color: '#003B57' },

  // ── Cloud & AI ──────────────────────────────────────────────────
  'Azure':            { Component: TbBrandAzure,       color: '#0078D4' },
  'Microsoft Azure':  { Component: TbBrandAzure,       color: '#0078D4' },
  'Azure Cognitive Services': { Component: TbBrandAzure, color: '#0078D4' },
  'Face API':         { Component: TbFaceId,           color: '#0078D4' },

  // ── DevOps & Containers ─────────────────────────────────────────
  'Docker':           { Component: SiDocker,           color: '#2496ED' },
  'Kubernetes':       { Component: SiKubernetes,       color: '#326CE5' },

  // ── Version Control / Tools ──────────────────────────────────────
  'Git':              { Component: SiGit,              color: '#F05032' },
  'GitHub':           { Component: SiGithub,           color: '#FFFFFF' },
  'Git/GitHub':       { Component: SiGit,              color: '#F05032' },
  'Git / GitHub':     { Component: SiGit,              color: '#F05032' },
  'GitLab':           { Component: SiGitlab,           color: '#FC6D26' },
  'Visual Studio':    { Component: TbBrandVisualStudio, color: '#5C2D91' },
  'Figma':            { Component: SiFigma,            color: '#F24E1E' },
  'Postman':          { Component: SiPostman,          color: '#FF6C37' },
  'Jest':             { Component: SiJest,             color: '#C21325' },
  'Jira':             { Component: SiJira,             color: '#0052CC' },
  'Linux':            { Component: SiLinux,            color: '#FCC624' },
}

export function getTechIcon(name: string, size = 16): ReactNode {
  const entry = ICON_MAP[name]
  if (!entry) return null
  return React.createElement(entry.Component, { size, color: entry.color })
}

export { ICON_MAP }
