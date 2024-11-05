import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

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
  event: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F7FAFC',
    borderRadius: 5,
    borderLeft: 3,
    borderColor: '#2B6CB0',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
  },
  eventDetail: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4A5568',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  notes: {
    marginTop: 8,
    fontSize: 11,
    fontStyle: 'italic',
    color: '#718096',
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

interface Event {
  title: string;
  start: Date;
  end: Date;
  client: string;
  address: string;
  team: string;
  notes?: string;
}

interface SchedulePDFProps {
  events: Event[];
}

function SchedulePDF({ events }: SchedulePDFProps) {
  const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendario Interventi</Text>
          <Text style={styles.subtitle}>
            Generato il {format(new Date(), "dd/MM/yyyy HH:mm", { locale: it })}
          </Text>
        </View>

        {sortedEvents.map((event, index) => (
          <View key={index} style={styles.event}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDetail}>
              <Text style={styles.label}>Cliente:</Text>
              {event.client}
            </Text>
            <Text style={styles.eventDetail}>
              <Text style={styles.label}>Indirizzo:</Text>
              {event.address}
            </Text>
            <Text style={styles.eventDetail}>
              <Text style={styles.label}>Squadra:</Text>
              {event.team}
            </Text>
            <Text style={styles.eventDetail}>
              <Text style={styles.label}>Data e Ora:</Text>
              {format(event.start, "dd/MM/yyyy HH:mm", { locale: it })} - {format(event.end, "HH:mm", { locale: it })}
            </Text>
            {event.notes && (
              <Text style={styles.notes}>
                <Text style={styles.label}>Note:</Text>
                {event.notes}
              </Text>
            )}
          </View>
        ))}

        <Text style={styles.footer}>
          © {new Date().getFullYear()} Cleaning Management System - Tutti i diritti riservati
        </Text>
      </Page>
    </Document>
  );
}

export default SchedulePDF;