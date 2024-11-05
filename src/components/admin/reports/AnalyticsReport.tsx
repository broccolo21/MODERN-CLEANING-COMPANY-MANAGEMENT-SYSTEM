import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4a5568',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2d3748',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  kpiItem: {
    width: '50%',
    padding: 10,
  },
  kpiTitle: {
    fontSize: 12,
    color: '#4a5568',
  },
  kpiValue: {
    fontSize: 20,
    color: '#2d3748',
    marginTop: 5,
  },
  kpiChange: {
    fontSize: 10,
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#718096',
  },
});

interface AnalyticsReportProps {
  data: {
    kpis: Array<{
      title: string;
      value: string;
      change: string;
    }>;
  };
}

function AnalyticsReport({ data }: AnalyticsReportProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Report Analytics</Text>
          <Text style={styles.subtitle}>
            Generato il {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KPI Principali</Text>
          <View style={styles.kpiGrid}>
            {data.kpis.map((kpi, index) => (
              <View key={index} style={styles.kpiItem}>
                <Text style={styles.kpiTitle}>{kpi.title}</Text>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={[
                  styles.kpiChange,
                  { color: kpi.change.startsWith('+') ? '#48bb78' : '#f56565' }
                ]}>
                  {kpi.change}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Cleaning Management System - Tutti i diritti riservati
        </Text>
      </Page>
    </Document>
  );
}

export default AnalyticsReport;