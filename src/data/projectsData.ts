export interface ProjectData {
  id: string;
  title: string;
  domain: 'data-eng' | 'machine-learning' | 'product-analytics' | 'sql-strategy';
  domainLabel: string;
  badgeClass: string;
  accentColor: string;
  tagline: string;
  shortSummary: string;
  breakthroughStat: {
    value: string;
    label: string;
    sublabel: string;
  };
  techStack: string[];
  githubUrl: string;
  caseStudyUrl?: string;
  overview: {
    businessProblem: string;
    technicalChallenge: string;
    solutionStatement: string;
  };
  architecture: {
    description: string;
    pipelineStages: {
      stage: string;
      description: string;
      tech: string;
    }[];
  };
  findings: {
    headline: string;
    bulletPoints: string[];
  };
  codeSnippet: {
    language: string;
    filename: string;
    explanation: string;
    code: string;
  };
  businessTakeaways: string[];
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    "id": "end-to-end-data-pipeline",
    "title": "Enterprise Analytics Data Platform",
    "domain": "data-eng",
    "domainLabel": "Data Platform & Engineering",
    "badgeClass": "badge-eng",
    "accentColor": "#10b981",
    "tagline": "Kimball Star Schema Warehouse & Incremental CDC Ingestion Engine",
    "shortSummary": "Unifies live Neon Cloud PostgreSQL sources, recurring SaaS subscriptions, and telemetry clickstreams into an analytics-ready Kimball dimensional warehouse engineered for 1.15M+ records.",
    "breakthroughStat": {
      "value": "1.15M+ Records",
      "label": "Orchestrated Across CDC & Warehouse",
      "sublabel": "103 Passing dbt Schema Tests · SCD Type II"
    },
    "techStack": [
      "Airflow 3",
      "dbt-core",
      "PostgreSQL 17",
      "Docker",
      "Python",
      "Ruff"
    ],
    "githubUrl": "https://github.com/sidharthmenon626-lab/end-to-end-data-pipeline",
    "overview": {
      "businessProblem": "High-growth subscription commerce generates fragmented data across transactional orders (440k+), SaaS billing (203k+), and web clickstreams (453k+). Teams operated in silos with conflicting definitions of revenue and retention.",
      "technicalChallenge": "Preventing duplicate state mutations and race conditions during high-throughput ingestion while enforcing strict historical accuracy without losing prior user demographic states.",
      "solutionStatement": "Engineered a dual-mode ingestion engine with automated Change Data Capture (CDC), sub-minute batch ingestion, Kimball star schema modeling with SCD Type II historical tracking, and Airflow 3 orchestration."
    },
    "architecture": {
      "description": "Multi-layer medallion pipeline running from raw extraction to presentation marts with automated observability.",
      "pipelineStages": [
        {
          "stage": "1. Dual Ingestion & CDC",
          "description": "Watermark state engine extracting from Neon PostgreSQL & Parquet lakehouse with tombstone and mutation sequencing.",
          "tech": "Python · NeonDB"
        },
        {
          "stage": "2. Raw Staging & Hygiene",
          "description": "Landing layer enforcing data hygiene, deduplicating clickstreams, and isolating corrupted anomalies.",
          "tech": "PostgreSQL 17"
        },
        {
          "stage": "3. Dimensional Warehouse",
          "description": "Kimball star schema with Slowly Changing Dimensions (SCD Type II) and range-partitioned fact tables.",
          "tech": "dbt-core"
        },
        {
          "stage": "4. Orchestration & Monitoring",
          "description": "Airflow 3 DAGs with automated retries, incident logging, and data drift detection.",
          "tech": "Airflow 3 · Docker"
        }
      ]
    },
    "findings": {
      "headline": "Sub-minute incremental ingestion latency with 100% test contract compliance.",
      "bulletPoints": [
        "103 strict dbt schema contract tests passing across all staging, dimension, and fact models.",
        "Zero data loss across 60,000+ customer lifecycle mutations tracked via SCD Type II valid_from/valid_to dates.",
        "Partitioned order facts across monthly bounds, reducing heavy analytical scan latency by 72%."
      ]
    },
    "codeSnippet": {
      "language": "sql",
      "filename": "models/marts/core/dim_customers_scd2.sql",
      "explanation": "SCD Type II customer dimension snapshot capturing historical plan changes without destructive updates.",
      "code": "-- dbt Incremental SCD Type II Dimension Model\nWITH ranked_customer_states AS (\n    SELECT\n        customer_id,\n        account_tier,\n        country_code,\n        subscription_status,\n        updated_at AS valid_from,\n        LEAD(updated_at) OVER (\n            PARTITION BY customer_id \n            ORDER BY updated_at ASC\n        ) AS valid_to,\n        CASE \n            WHEN LEAD(updated_at) OVER (PARTITION BY customer_id ORDER BY updated_at ASC) IS NULL \n            THEN TRUE ELSE FALSE \n        END AS is_current\n    FROM {{ ref('stg_customers') }}\n)\nSELECT \n    MD5(customer_id || '-' || valid_from) AS customer_sk,\n    customer_id,\n    account_tier,\n    country_code,\n    subscription_status,\n    valid_from,\n    COALESCE(valid_to, '9999-12-31'::timestamp) AS valid_to,\n    is_current\nFROM ranked_customer_states;"
    },
    "businessTakeaways": [
      "Eliminated data discrepancy debates between Product and Finance by establishing a single audited star schema.",
      "SCD Type II modeling allows executives to run time-travel ARR reporting on exact historical subscription tiers.",
      "Automated Airflow 3 incident webhooks caught ingestion anomalies before upstream Metabase dashboards broke."
    ]
  },
  {
    "id": "customer-churn-prediction-sql",
    "title": "B2B SaaS Churn Prediction & Retention Engine",
    "domain": "machine-learning",
    "domainLabel": "Applied Machine Learning",
    "badgeClass": "badge-ml",
    "accentColor": "#a855f7",
    "tagline": "Leakage-Free ML Classifier Preserving $118k+ in Annual Recurring Revenue",
    "shortSummary": "End-to-end B2B SaaS churn prediction system transitioning Customer Success from reactive churn post-mortems to algorithmic, 30-day early interventions—saving up to $118k+ in ARR.",
    "breakthroughStat": {
      "value": "$118k+ ARR",
      "label": "Preserved Revenue via Threshold Tuning",
      "sublabel": "74% Recall @ p=0.35 · Escaping 0% Recall Trap"
    },
    "techStack": [
      "Python 3.11",
      "PostgreSQL 16",
      "Scikit-Learn",
      "Pandas",
      "Seaborn"
    ],
    "githubUrl": "https://github.com/sidharthmenon626-lab/customer-churn-prediction-sql",
    "overview": {
      "businessProblem": "In a cohort of 859 accounts with 27.36% baseline churn, each lost customer represents $174.71 MRR (~$472,725 cumulative ARR at risk). Customer Success was reactive, learning about cancellations only upon exit requests.",
      "technicalChallenge": "The Accuracy Trap: A naive model predicting \"no one will churn\" scores 72.64% accuracy, yet catches 0 accounts and loses $472k ARR. Feature leakage across lookback windows frequently causes models to fail in production.",
      "solutionStatement": "Constructed an audited SQL feature pipeline with strict cutoff dates and trained Logistic Regression and Random Forest models optimized at threshold p=0.35 to maximize financial revenue retention."
    },
    "architecture": {
      "description": "Zero-leakage ML pipeline transforming raw PostgreSQL events into calibrated retention action lists.",
      "pipelineStages": [
        {
          "stage": "1. Audited Cohort Extraction",
          "description": "SQL CTE query enforcing strict cutoff date boundaries to guarantee zero feature leakage.",
          "tech": "PostgreSQL · CTEs"
        },
        {
          "stage": "2. Feature Engineering",
          "description": "48 engineered metrics: support ticket velocity, seat utilization ratio, billing drift, and login recency.",
          "tech": "Python · Pandas"
        },
        {
          "stage": "3. Stratified Modeling",
          "description": "Stratified 80/20 train/test evaluation with Random Forest, hyperparameter tuning, and ROC-AUC optimization.",
          "tech": "Scikit-Learn"
        },
        {
          "stage": "4. Threshold & CRM Ops",
          "description": "Decision threshold calibrated at p=0.35 (and p=0.20 safety threshold) feeding prioritized accounts to CS playbooks.",
          "tech": "Decision Memo"
        }
      ]
    },
    "findings": {
      "headline": "Optimal threshold tuning captured 74% of at-risk accounts vs. naive baseline.",
      "bulletPoints": [
        "Default p=0.50 threshold missed 48% of churners due to class imbalance; lowering to p=0.35 boosted recall from 52% to 74%.",
        "Top churn driver: Sharp degradation in seat utilization (<40% capacity) coupled with a spike in unresolved billing tickets.",
        "At p=0.35, the team intercepts 221 high-risk accounts, preserving an estimated $118,500+ in annual recurring revenue."
      ]
    },
    "codeSnippet": {
      "language": "python",
      "filename": "src/threshold_optimization.py",
      "explanation": "Calculates the financial revenue trade-off curve across classification thresholds to find the optimal ROI point.",
      "code": "def calculate_revenue_impact(y_true, y_probs, avg_mrr=174.71, intervention_cost=50, save_rate=0.45):\n    \"\"\"\n    Evaluates net ARR saved across decision thresholds (0.10 to 0.90).\n    Demonstrates why naive accuracy (p=0.50) is financially suboptimal.\n    \"\"\"\n    results = []\n    for threshold in np.linspace(0.10, 0.90, 81):\n        y_pred = (y_probs >= threshold).astype(int)\n        tp = np.sum((y_pred == 1) & (y_true == 1))\n        fp = np.sum((y_pred == 1) & (y_true == 0))\n        \n        # Financial model: saved churned customers minus cost of intervention\n        retained_arr = (tp * save_rate) * (avg_mrr * 12)\n        campaign_cost = (tp + fp) * intervention_cost\n        net_arr_saved = retained_arr - campaign_cost\n        \n        results.append({\n            'threshold': threshold,\n            'recall': tp / np.sum(y_true == 1),\n            'precision': tp / (tp + fp) if (tp + fp) > 0 else 0,\n            'net_arr_saved': net_arr_saved\n        })\n    return pd.DataFrame(results)"
    },
    "businessTakeaways": [
      "Proved to leadership that model accuracy is a vanity metric; revenue-weighted recall is the true business objective.",
      "Constructed specific 30-day intervention playbooks: executive outreach for enterprise tiers, automated onboarding refreshers for mid-market.",
      "Reduced reactive churn post-mortems by 65% in favor of weekly predictive intervention cadences."
    ]
  },
  {
    "id": "demand-forecasting-ml",
    "title": "E-Commerce Weekly Demand Forecasting",
    "domain": "machine-learning",
    "domainLabel": "Applied Machine Learning",
    "badgeClass": "badge-ml",
    "accentColor": "#a855f7",
    "tagline": "Rolling-Origin Time Series Regressor Reducing Stockouts Across 14 Categories",
    "shortSummary": "Leakage-free time series forecasting system predicting weekly category-level order quantities across 40,000 customer orders to optimize inventory replenishment and minimize stockouts.",
    "breakthroughStat": {
      "value": "19.20% WMAPE",
      "label": "Huber Regressor Generalization",
      "sublabel": "+22.28% Error Reduction Over Last-Value Naive"
    },
    "techStack": [
      "Python 3.11",
      "PostgreSQL (Neon)",
      "Scikit-Learn",
      "TimeSeriesSplit",
      "Pandas"
    ],
    "githubUrl": "https://github.com/sidharthmenon626-lab/demand-forecasting-ml",
    "overview": {
      "businessProblem": "Inaccurate demand planning caused costly stockouts on high-velocity items (lost GMV) and over-ordering on slow-moving inventory (bloated holding costs) across 4,000 products and 14 categories.",
      "technicalChallenge": "Preventing temporal data leakage in non-stationary retail time series where sudden promotional spikes distort ordinary regression models and lead to severe over-stocking.",
      "solutionStatement": "Constructed rolling lag features (t-1, t-2, t-4, 4w/12w rolling statistics) and evaluated models using expanding-window TimeSeriesSplit cross-validation. The robust Huber Regressor proved superior by dynamically damping post-promotional decay."
    },
    "architecture": {
      "description": "End-to-end temporal engineering and expanding-window validation pipeline.",
      "pipelineStages": [
        {
          "stage": "1. Aggregation Extraction",
          "description": "Audited PostgreSQL extraction aggregating 40,000 orders into 31,938 weekly category-item series.",
          "tech": "PostgreSQL · NeonDB"
        },
        {
          "stage": "2. Leak-Free Feature Store",
          "description": "Feature matrix generated strictly on past time steps: Lags t-1, t-2, t-4, and 4-week & 12-week moving medians.",
          "tech": "Python · Pandas"
        },
        {
          "stage": "3. Rolling-Origin CV",
          "description": "Expanding-window TimeSeriesSplit (5 folds) preventing future lookahead bias in cross-validation.",
          "tech": "Scikit-Learn"
        },
        {
          "stage": "4. Robust Huber Modeling",
          "description": "Outlier-resistant Huber loss damping extreme promotional spikes while preserving linear trends.",
          "tech": "Scikit-Learn"
        }
      ]
    },
    "findings": {
      "headline": "Huber Regressor beats Last-Value Naive baseline by 22.28% in WMAPE.",
      "bulletPoints": [
        "Huber Regressor achieved 19.20% WMAPE (60.77 RMSE) vs. 24.71% WMAPE (78.19 RMSE) for last-value persistence.",
        "High-volatility categories (Headphones) benefited the most from Huber loss, avoiding massive inventory over-orders following Black Friday spikes.",
        "Rolling 4-week demand velocity and 12-week seasonal lag were identified as the highest-weight predictive features."
      ]
    },
    "codeSnippet": {
      "language": "python",
      "filename": "src/models.py",
      "explanation": "Expanding-window TimeSeriesSplit validation pipeline evaluating Huber loss against Ridge and Random Forest baselines.",
      "code": "from sklearn.model_selection import TimeSeriesSplit\nfrom sklearn.linear_model import HuberRegressor\n\ndef evaluate_rolling_origin_forecast(X, y, n_splits=5):\n    \"\"\"\n    Evaluates Huber Regressor using strict temporal forward-chaining.\n    No future data ever enters training folds.\n    \"\"\"\n    tscv = TimeSeriesSplit(n_splits=n_splits)\n    fold_metrics = []\n    \n    for fold, (train_idx, val_idx) in enumerate(tscv.split(X)):\n        X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]\n        y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]\n        \n        # Robust Huber Regressor with epsilon=1.35\n        model = HuberRegressor(epsilon=1.35, alpha=10.0, max_iter=1000)\n        model.fit(X_train, y_train)\n        preds = model.predict(X_val)\n        \n        # Weighted Mean Absolute Percentage Error (WMAPE)\n        wmape = np.sum(np.abs(y_val - preds)) / np.sum(y_val)\n        fold_metrics.append({'fold': fold + 1, 'wmape': wmape})\n        \n    return pd.DataFrame(fold_metrics)"
    },
    "businessTakeaways": [
      "Eliminated manual spreadsheet guessing by warehouse purchasing managers with an automated weekly forecast feed.",
      "Prevented post-holiday inventory glut by automatically discounting promotional demand surges in stock replenishment.",
      "Projected a 14% reduction in annualized inventory holding costs through tightened safety-stock thresholds."
    ]
  },
  {
    "id": "ab-testing-product-analytics",
    "title": "PulseFlow: A/B Testing & Product Analytics Audit",
    "domain": "product-analytics",
    "domainLabel": "Product Analytics & Experimentation",
    "badgeClass": "badge-prod",
    "accentColor": "#06b6d4",
    "tagline": "Statistical Audit of 50,000-User Homepage Test & Mobile Friction Analysis",
    "shortSummary": "A full product experimentation audit evaluating a reported +13% conversion lift ($p=0.015$). Uncovered critical mobile checkout collapse (-31pp drop-off), checked for Simpson’s Paradox, and authored a CPO rollout memo.",
    "breakthroughStat": {
      "value": "-31pp Mobile Gap",
      "label": "Friction Point Discovered at Step 3→4",
      "sublabel": "Averting a Fatal 100% Rollout Disaster"
    },
    "techStack": [
      "Python",
      "Statsmodels",
      "Scipy",
      "Seaborn",
      "Pandas"
    ],
    "githubUrl": "https://github.com/sidharthmenon626-lab/ab-testing-product-analytics",
    "overview": {
      "businessProblem": "Product teams reported a celebratory +13% conversion lift ($p=0.015$) on a new homepage redesign across 50,000 visitors. Management was poised to ship 100% to all users immediately.",
      "technicalChallenge": "Aggregate metrics hide segment-level collapse. Without evaluating Sample Ratio Mismatch (SRM), novelty decay, and device segmentation, shipping the variant would cause severe mobile revenue destruction.",
      "solutionStatement": "Conducted a deep 5-milestone statistical audit: Verified SRM, computed 95% Wald confidence intervals, performed platform segment breakdown (Simpson’s Paradox check), and delivered a 1-page CPO decision memorandum."
    },
    "architecture": {
      "description": "End-to-end experiment evaluation methodology following Minto Pyramid executive reporting.",
      "pipelineStages": [
        {
          "stage": "1. Clickstream Funnel Audit",
          "description": "De-duplicated 50k user events across 5 sequential funnel stages to track drop-off waterfalls.",
          "tech": "Python · Pandas"
        },
        {
          "stage": "2. Statistical Diagnostics",
          "description": "Two-proportion Z-tests, Welch’s t-test, Chi-square goodness-of-fit for SRM, and novelty decay tracking.",
          "tech": "Statsmodels · Scipy"
        },
        {
          "stage": "3. Simpson’s Breakdown",
          "description": "Dissecting conversion lift by Mobile vs Desktop to uncover divergent platform dynamics.",
          "tech": "Seaborn · Matplotlib"
        },
        {
          "stage": "4. Executive CPO Memo",
          "description": "Situation-Complication-Resolution (SCR) memo recommending a conditional Desktop-only rollout.",
          "tech": "Executive Memo"
        }
      ]
    },
    "findings": {
      "headline": "The +13% overall lift was an artifact of desktop gains masking severe mobile checkout collapse.",
      "bulletPoints": [
        "Desktop users converted at 19.26% (+12.51pp higher than mobile at 6.75%), driving virtually all aggregate lift.",
        "At Step 3 → 4 (Add to Cart to Checkout Start), Mobile completion plummeted to 30.14% (69.86% abandonment) vs 61.14% on Desktop—a 31pp deficit.",
        "Novelty Decay: Week 1 lift (+18%) attenuated to +8% in Week 2, confirming early novelty bias.",
        "Root Cause: Mobile viewports pushed primary payment CTAs below the fold, causing instant cart abandonment."
      ]
    },
    "codeSnippet": {
      "language": "python",
      "filename": "src/stats_util.py",
      "explanation": "Reusable two-proportion Z-test helper with Wald 95% Confidence Interval and SRM verification.",
      "code": "import numpy as np\nfrom scipy import stats\n\ndef two_proportion_z_test(conv_ctrl, n_ctrl, conv_var, n_var, alpha=0.05):\n    \"\"\"\n    Calculates pooled two-proportion Z-score, two-tailed p-value,\n    and Wald 95% confidence interval for relative conversion lift.\n    \"\"\"\n    p_ctrl = conv_ctrl / n_ctrl\n    p_var = conv_var / n_var\n    \n    # Pooled standard error under null hypothesis\n    p_pooled = (conv_ctrl + conv_var) / (n_ctrl + n_var)\n    se_pooled = np.sqrt(p_pooled * (1 - p_pooled) * (1/n_ctrl + 1/n_var))\n    \n    z_stat = (p_var - p_ctrl) / se_pooled\n    p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))\n    \n    # Unpooled SE for Wald Confidence Interval\n    se_diff = np.sqrt((p_ctrl * (1 - p_ctrl) / n_ctrl) + (p_var * (1 - p_var) / n_var))\n    z_crit = stats.norm.ppf(1 - alpha / 2)\n    diff = p_var - p_ctrl\n    ci_lower = diff - (z_crit * se_diff)\n    ci_upper = diff + (z_crit * se_diff)\n    \n    return {\n        'relative_lift_pct': ((p_var - p_ctrl) / p_ctrl) * 100,\n        'z_stat': z_stat,\n        'p_value': p_value,\n        'ci_95': (ci_lower, ci_upper),\n        'is_significant': p_value < alpha\n    }"
    },
    "businessTakeaways": [
      "Halted an executive 100% rollout that would have severely damaged mobile conversion across 50% of the customer base.",
      "Advised a conditional rollout: Ship new homepage to Desktop immediately; iterate and fix mobile CTA fold hierarchy before re-testing.",
      "Established company-wide experimentation hygiene standards requiring segment audits on every future A/B test."
    ]
  },
  {
    "id": "sql-business-insights",
    "title": "E-Commerce Founder Analytics: 10 SQL Queries",
    "domain": "sql-strategy",
    "domainLabel": "SQL Analytics & Business Strategy",
    "badgeClass": "badge-sql",
    "accentColor": "#f59e0b",
    "tagline": "CTEs & Window Functions Diagnosing Revenue Collapse and Whale Concentration",
    "shortSummary": "Ten production SQL queries against an e-commerce warehouse answering the questions a founder actually asks: revenue collapse diagnosis, cohort retention erosion, whale spend concentration, and UPI recovery.",
    "breakthroughStat": {
      "value": "88% of Revenue",
      "label": "Generated by Top 40% Spenders",
      "sublabel": "Whale Curve · 50% → 18% Cohort Retention Drop"
    },
    "techStack": [
      "PostgreSQL",
      "Metabase",
      "CTE Pipelines",
      "Window Functions",
      "Notion"
    ],
    "githubUrl": "https://github.com/sidharthmenon626-lab/sql-business-insights",
    "caseStudyUrl": "https://shy-position-1fc.notion.site/What-10-SQL-Queries-Told-Me-About-This-Business-39ea3c1d0a298064a4a5d3ab66edf684",
    "overview": {
      "businessProblem": "Daily revenue plummeted by ~80% from its April peak (₹17.6M) to mid-June (₹11.4M). Founders feared pricing collapse, poor ad channel quality, and payment provider failures.",
      "technicalChallenge": "Unraveling aggregate metrics without getting misled by surface-level trends. Standard transactional tables needed multi-stage CTE transformations to diagnose retention and LTV dynamics.",
      "solutionStatement": "Authored 10 modular, header-commented SQL queries enforcing house style (CTEs over subqueries, NULLIF on every denominator, sanity-check assertions) to isolate the exact operational failure modes."
    },
    "architecture": {
      "description": "Audit framework covering the full spectrum of e-commerce operations in Postgres/Metabase.",
      "pipelineStages": [
        {
          "stage": "1. Revenue Velocity & AOV",
          "description": "Daily moving revenue trends against Average Order Value (AOV) to decouple price vs volume dynamics.",
          "tech": "Window Functions"
        },
        {
          "stage": "2. Cohort Retention Matrix",
          "description": "Tracking Month-1 through Month-6 customer return rates across monthly signup cohorts.",
          "tech": "Postgres CTEs"
        },
        {
          "stage": "3. Channel Funnel Leakage",
          "description": "Stage-to-stage conversion audit (View → Cart → Checkout → Purchase) segmented across 5 acquisition sources.",
          "tech": "Metabase · SQL"
        },
        {
          "stage": "4. Whale Curve & Gateway Failures",
          "description": "LTV decile revenue concentration and payment method failure root-cause analysis (UPI vs Cards).",
          "tech": "PostgreSQL"
        }
      ]
    },
    "findings": {
      "headline": "The revenue decline was a new-customer volume collapse, not a pricing or product quality issue.",
      "bulletPoints": [
        "AOV held completely flat at ₹7,000–₹8,000 while revenue fell 80%: Confirmed customer willingness-to-pay remained healthy, but acquisition volume collapsed.",
        "Month-1 cohort retention collapsed from 50.2% (March) to 18.2% (May): Newer signups churned 3x faster than initial cohorts.",
        "Whale Concentration: The ₹120,000+ spend bucket accounts for only 40% of customers but generates 88% of total revenue.",
        "UPI Failures: 5.5% failure rate (12,835 attempts), with 25% stemming from network timeouts rather than user declines."
      ]
    },
    "codeSnippet": {
      "language": "sql",
      "filename": "queries/q8_customer_ltv_concentration.sql",
      "explanation": "CTE pipeline computing lifetime spend buckets, customer counts, and cumulative revenue shares.",
      "code": "WITH customer_spend AS (\n    SELECT\n        customer_id,\n        SUM(order_total) AS total_lifetime_spend,\n        COUNT(order_id) AS total_orders\n    FROM ecom.orders\n    WHERE order_status = 'completed'\n    GROUP BY customer_id\n),\nspend_buckets AS (\n    SELECT\n        customer_id,\n        total_lifetime_spend,\n        CASE\n            WHEN total_lifetime_spend >= 120000 THEN '₹120k+ (Whales)'\n            WHEN total_lifetime_spend >= 60000  THEN '₹60k - ₹120k'\n            WHEN total_lifetime_spend >= 20000  THEN '₹20k - ₹60k'\n            ELSE 'Under ₹20k'\n        END AS ltv_tier\n    FROM customer_spend\n),\ntier_aggregates AS (\n    SELECT\n        ltv_tier,\n        COUNT(customer_id) AS customer_count,\n        SUM(total_lifetime_spend) AS tier_revenue\n    FROM spend_buckets\n    GROUP BY ltv_tier\n)\nSELECT\n    ltv_tier,\n    customer_count,\n    ROUND(customer_count * 100.0 / NULLIF(SUM(customer_count) OVER (), 0), 2) AS customer_share_pct,\n    tier_revenue,\n    ROUND(tier_revenue * 100.0 / NULLIF(SUM(tier_revenue) OVER (), 0), 2) AS revenue_share_pct\nFROM tier_aggregates\nORDER BY tier_revenue DESC;"
    },
    "businessTakeaways": [
      "Advised immediate prioritization of the ₹120k+ whale cohort with dedicated VIP concierge support.",
      "Refocused marketing budgets away from low-intent top-of-funnel acquisition toward early-cohort onboarding.",
      "Implemented automated retry logic for timeout-induced UPI failures, instantly recovering lost transaction revenue."
    ]
  },
  {
    "id": "sql-product-analytics",
    "title": "B2C vs B2B Product Analytics: 10 SQL Queries",
    "domain": "sql-strategy",
    "domainLabel": "SQL Analytics & Business Strategy",
    "badgeClass": "badge-sql",
    "accentColor": "#f59e0b",
    "tagline": "Comparative Analytics Across Two Dual-Warehouse Business Models",
    "shortSummary": "Ten SQL queries split across two real-world schemas—B2C e-commerce (ecom) and B2B SaaS (saas)—answering identical growth and retention questions across fundamentally different business realities.",
    "breakthroughStat": {
      "value": "2-Day vs 417-Day",
      "label": "Activation Velocity Divergence",
      "sublabel": "65% Lost GMV in High-Value Carts · B2B NRR"
    },
    "techStack": [
      "PostgreSQL",
      "Metabase",
      "Cohort Retention",
      "SaaS Unit Economics",
      "SQL"
    ],
    "githubUrl": "https://github.com/sidharthmenon626-lab/sql-product-analytics",
    "overview": {
      "businessProblem": "Product leaders often apply consumer metrics to enterprise SaaS or vice-versa, causing flawed strategic bets. Understanding how funnels, activation velocity, and revenue expansion diverge is critical.",
      "technicalChallenge": "Writing performant, portable SQL that calculates complex retention (weekly active user % in B2C vs 12-month Net MRR Retention in B2B) and sessionization across two separate schema topologies.",
      "solutionStatement": "Engineered a paired benchmark analysis comparing 5 queries in B2C against 5 queries in B2B, highlighting structural differences in time horizons, retention definitions, and monetization levers."
    },
    "architecture": {
      "description": "Side-by-side comparative analytics architecture evaluated in Postgres/Metabase.",
      "pipelineStages": [
        {
          "stage": "1. Funnel Cadence",
          "description": "5-step in-session checkout funnel (B2C) vs 14/30/60-day trial conversion windows (B2B).",
          "tech": "PostgreSQL CTEs"
        },
        {
          "stage": "2. Activation Velocity",
          "description": "Median time-to-first-order (B2C: 1.9–3.2 days) vs median time-to-plan-upgrade (B2B: 417 days).",
          "tech": "Window Functions"
        },
        {
          "stage": "3. Cart Inversion & Expansion",
          "description": "High-value cart abandonment in B2C (65% GMV in top buckets) vs plan-upgrade expansion in B2B (70% of expansion MRR).",
          "tech": "Metabase"
        },
        {
          "stage": "4. Early Usage Signals",
          "description": "B2C high-density clickstream vs B2B feature adoption thresholding.",
          "tech": "PostgreSQL"
        }
      ]
    },
    "findings": {
      "headline": "B2C decisions are won in hours; B2B decisions are won through 12-month net expansion.",
      "bulletPoints": [
        "Funnel Cadence: B2C checkout takes minutes inside a single session; B2B evaluation spans multi-week trial evaluation periods.",
        "Retention Definition: B2C measures user activity %; B2B measures Net Dollar Retention (NDR) which can exceed 100% via expansion.",
        "Activation Velocity: Median B2C user activation takes 2–3 days; median time to an enterprise B2B plan upgrade is 417 days.",
        "B2C Cart Inversion: While abandonment rates drop as cart value rises (53% → 12%), ~65% of all lost GMV sits inside high-value carts."
      ]
    },
    "codeSnippet": {
      "language": "sql",
      "filename": "queries/saas_s1_monthly_mrr_movements.sql",
      "explanation": "SaaS revenue waterfall SQL decomposing beginning MRR, new MRR, expansion MRR, churn MRR, and ending MRR.",
      "code": "WITH monthly_subscriptions AS (\n    SELECT\n        account_id,\n        DATE_TRUNC('month', period_date) AS mrr_month,\n        mrr_amount,\n        LAG(mrr_amount) OVER (\n            PARTITION BY account_id \n            ORDER BY DATE_TRUNC('month', period_date)\n        ) AS prev_mrr\n    FROM saas.subscription_ledger\n),\nmrr_classifications AS (\n    SELECT\n        mrr_month,\n        account_id,\n        mrr_amount,\n        COALESCE(prev_mrr, 0) AS prev_mrr,\n        CASE\n            WHEN prev_mrr IS NULL OR prev_mrr = 0 THEN mrr_amount\n            ELSE 0\n        END AS new_mrr,\n        CASE\n            WHEN mrr_amount > prev_mrr AND prev_mrr > 0 THEN (mrr_amount - prev_mrr)\n            ELSE 0\n        END AS expansion_mrr,\n        CASE\n            WHEN mrr_amount < prev_mrr THEN (prev_mrr - mrr_amount)\n            ELSE 0\n        END AS churn_mrr\n    FROM monthly_subscriptions\n)\nSELECT\n    mrr_month,\n    SUM(new_mrr) AS total_new_mrr,\n    SUM(expansion_mrr) AS total_expansion_mrr,\n    SUM(churn_mrr) AS total_churn_mrr,\n    SUM(mrr_amount) AS ending_mrr,\n    ROUND((SUM(expansion_mrr) * 100.0) / NULLIF(SUM(prev_mrr), 0), 2) AS expansion_rate_pct\nFROM mrr_classifications\nGROUP BY mrr_month\nORDER BY mrr_month ASC;"
    },
    "businessTakeaways": [
      "Proved that B2B product strategy must optimize for year-2 expansion rather than hyper-optimizing 7-day signups.",
      "Showed e-commerce marketers that saving just 5% of high-value abandoned carts yields 3x the revenue of saving low-value carts.",
      "Highlighted that B2B feature adoption thresholds were set too high (zero accounts adopted N=3 features in 14 days), necessitating product simplification."
    ]
  }
];
