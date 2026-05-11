import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { GuideDefinition, ContentPage } from "@/components/PDFGuides/types";

const styles = StyleSheet.create({
  page: { paddingTop: 36, paddingHorizontal: 34, paddingBottom: 50, fontFamily: "Helvetica", fontSize: 10, lineHeight: 1.45, color: "#0f172a" },
  coverPage: { padding: 0, position: "relative" },
  coverTop: { height: "100%", width: "100%", padding: 40, color: "#ffffff", justifyContent: "space-between" },
  coverBrand: { fontSize: 13, fontWeight: 700 },
  coverTitle: { fontSize: 31, fontWeight: 700, lineHeight: 1.2 },
  coverSubtitle: { fontSize: 13, marginTop: 8, opacity: 0.95 },
  coverEmoji: { fontSize: 56 },
  coverUrl: { fontSize: 11, marginTop: 6 },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 6, color: "#065f46" },
  subtitle: { fontSize: 11, color: "#334155", marginBottom: 10 },
  sectionDivider: { marginVertical: 8, borderBottomWidth: 2, borderBottomColor: "#16a34a", width: 160 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 6 },
  check: { color: "#16a34a", marginRight: 6, fontWeight: 700 },
  bulletText: { flex: 1 },
  tableTitle: { fontSize: 11, fontWeight: 700, marginTop: 8, marginBottom: 6, color: "#065f46" },
  table: { borderWidth: 1, borderColor: "#bbf7d0", marginBottom: 8 },
  tr: { flexDirection: "row" },
  th: { flex: 1, backgroundColor: "#dcfce7", padding: 6, fontSize: 9, fontWeight: 700, borderRightWidth: 1, borderRightColor: "#bbf7d0" },
  td: { flex: 1, padding: 6, fontSize: 9, borderTopWidth: 1, borderTopColor: "#bbf7d0", borderRightWidth: 1, borderRightColor: "#bbf7d0" },
  infoBox: { backgroundColor: "#ecfdf3", borderWidth: 1, borderColor: "#86efac", borderRadius: 6, padding: 8, marginTop: 8 },
  infoTitle: { fontSize: 10, fontWeight: 700, color: "#166534", marginBottom: 3 },
  footer: { position: "absolute", bottom: 20, left: 34, right: 34, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: "#334155" },
  aboutTitle: { fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#065f46" },
  aboutBody: { fontSize: 11, marginBottom: 6 },
  disclaimer: { marginTop: 10, fontSize: 9, color: "#334155" }
});

function HeaderSection({ item }: { item: ContentPage }) {
  return (
    <>
      <Text style={styles.title}>{item.title}</Text>
      {!!item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
      <View style={styles.sectionDivider} />
    </>
  );
}

function StandardPage({ item }: { item: ContentPage }) {
  return (
    <View>
      <HeaderSection item={item} />
      {(item.bullets || []).map((bullet) => (
        <View key={bullet} style={styles.bulletRow}>
          <Text style={styles.check}>✓</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}

      {!!item.tableTitle && <Text style={styles.tableTitle}>{item.tableTitle}</Text>}
      {!!item.tableHeaders?.length && (
        <View style={styles.table}>
          <View style={styles.tr}>
            {item.tableHeaders.map((header) => (
              <Text key={header} style={styles.th}>{header}</Text>
            ))}
          </View>
          {(item.tableRows || []).map((row, rowIndex) => (
            <View key={`${row[0]}-${rowIndex}`} style={styles.tr}>
              {row.map((cell, cellIndex) => (
                <Text key={`${cell}-${cellIndex}`} style={styles.td}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {!!item.infoBoxContent && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{item.infoBoxTitle || "Pro Tip"}</Text>
          <Text>{item.infoBoxContent}</Text>
        </View>
      )}

      {!!item.factBoxContent && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{item.factBoxTitle || "Interesting Fact"}</Text>
          <Text>{item.factBoxContent}</Text>
        </View>
      )}

      {!!item.tip && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Pro Tip</Text>
          <Text>{item.tip}</Text>
        </View>
      )}

      {!!item.checklist?.length && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Daily Checklist</Text>
          {item.checklist.map((check) => (
            <View key={check} style={styles.bulletRow}>
              <Text style={styles.check}>☐</Text>
              <Text style={styles.bulletText}>{check}</Text>
            </View>
          ))}
        </View>
      )}

      {!!item.quote && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Motivational Quote</Text>
          <Text>{item.quote}</Text>
        </View>
      )}
    </View>
  );
}

export function GuideDocument({ guide }: { guide: GuideDefinition }) {
  return (
    <Document title={guide.title} subject={guide.description} author="Health Fruits Tips" creator="healthfruitstips.com">
      <Page size="A4" style={styles.coverPage}>
        <View style={[styles.coverTop, { backgroundColor: guide.coverGradient[0] }]}>
          <Text style={styles.coverBrand}>Health Fruits Tips</Text>
          <View>
            <Text style={styles.coverEmoji}>{guide.coverEmoji}</Text>
            <Text style={styles.coverTitle}>{guide.title}</Text>
            <Text style={styles.coverSubtitle}>{guide.subtitle}</Text>
            <Text style={styles.coverUrl}>healthfruitstips.com</Text>
          </View>
          <Text>Premium Printable Guide | Share Freely</Text>
        </View>
      </Page>

      {guide.contents.map((item, index) => (
        <Page key={`${item.title}-${index}`} size="A4" style={styles.page} wrap={false}>
          <StandardPage item={item} />
          <View style={styles.footer} fixed>
            <Text>healthfruitstips.com</Text>
            <Text>{`Page ${index + 2}`}</Text>
          </View>
        </Page>
      ))}

      <Page size="A4" style={styles.page} wrap={false}>
        <Text style={styles.aboutTitle}>About Health Fruits Tips</Text>
        <Text style={styles.aboutBody}>
          Health Fruits Tips publishes practical, evidence-aware nutrition guides to help families make better food and lifestyle decisions.
        </Text>
        <Text style={styles.aboutBody}>Website: healthfruitstips.com</Text>
        <Text style={styles.aboutBody}>Share this guide freely with friends, students, and family.</Text>
        <View style={styles.sectionDivider} />
        <Text style={styles.infoTitle}>Social Media</Text>
        {guide.socials.map((social) => (
          <Text key={social} style={styles.aboutBody}>{social}</Text>
        ))}
        <Text style={styles.disclaimer}>{guide.medicalDisclaimer}</Text>
        <View style={styles.footer} fixed>
          <Text>healthfruitstips.com</Text>
          <Text>{`Page ${guide.contents.length + 2}`}</Text>
        </View>
      </Page>
    </Document>
  );
}
