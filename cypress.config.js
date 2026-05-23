const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://example.cypress.io',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      const reportsDir = path.join(config.projectRoot, 'reports')
      if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true })

      on('after:spec', (spec, results) => {
        try {
          const partial = path.join(reportsDir, 'partial-report.json')
          let data = []
          if (fs.existsSync(partial)) {
            try {
              data = JSON.parse(fs.readFileSync(partial, 'utf8')) || []
            } catch (e) {
              data = []
            }
          }

          data.push({
            specName: spec.name,
            specPath: spec.relative,
            stats: results.stats,
            tests: (results.tests || []).map(t => ({ title: t.title, state: t.state, displayError: t.displayError }))
          })

          fs.writeFileSync(partial, JSON.stringify(data, null, 2))
        } catch (err) {
          // don't fail the run if reporting fails
          // eslint-disable-next-line no-console
          console.error('after:spec reporting error', err && err.message)
        }
      })

      on('after:run', (results) => {
        try {
          const final = {
            totalTests: results.totalTests,
            totalPassed: results.totalPassed,
            totalFailed: results.totalFailed,
            totalPending: results.totalPending,
            startedTestsAt: results.startedTestsAt,
            endedTestsAt: results.endedTestsAt,
            runs: []
          }

          if (results && Array.isArray(results.runs)) {
            final.runs = results.runs.map(r => ({
              specName: r.spec.name,
              specPath: r.spec.relative,
              stats: r.stats,
              tests: (r.tests || []).map(t => ({ title: t.title, state: t.state, displayError: t.displayError }))
            }))
          }

          const outJson = path.join(reportsDir, 'execution-report.json')
          fs.writeFileSync(outJson, JSON.stringify(final, null, 2))

          const outText = path.join(reportsDir, 'execution-report.txt')
          const lines = []
          lines.push('Cypress Execution Report')
          lines.push(`Started: ${results.startedTestsAt}`)
          lines.push(`Ended:   ${results.endedTestsAt}`)
          lines.push(`Total tests: ${results.totalTests}`)
          lines.push(`Passed:      ${results.totalPassed}`)
          lines.push(`Failed:      ${results.totalFailed}`)
          lines.push(`Pending:     ${results.totalPending}`)
          lines.push('')

          for (const run of final.runs) {
            lines.push(`Spec: ${run.specName}`)
            lines.push(`  Tests: ${run.stats.tests}, Pass: ${run.stats.passes}, Fail: ${run.stats.failures}`)
            for (const t of run.tests) {
              lines.push(`    - ${t.state.toUpperCase()}: ${Array.isArray(t.title) ? t.title.join(' › ') : t.title}`)
              if (t.state !== 'passed' && t.displayError) {
                lines.push(`       Error: ${t.displayError}`)
              }
            }
            lines.push('')
          }

          fs.writeFileSync(outText, lines.join('\n'))

          const partial = path.join(reportsDir, 'partial-report.json')
          try { if (fs.existsSync(partial)) fs.unlinkSync(partial) } catch (e) {}
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('after:run reporting error', err && err.message)
        }

        return null
      })

      return config
    }
  },
})
