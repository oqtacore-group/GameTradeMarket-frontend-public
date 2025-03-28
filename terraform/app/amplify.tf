resource "aws_amplify_app" "GameTradeMarket-frontend-app" {
  name       = var.name
  platform = "WEB_DYNAMIC"
  iam_service_role_arn = aws_iam_role.amplify_role_app.arn

  repository = "https://github.com/oqtacore-group/GameTradeMarket-frontend-public"
  access_token = "SET_YOUR_GH_ACCESS_TOKEN_HERE"

//  custom_rule {
//    source = "/<*>"
//    status = "404"
//    target = "/index.html"
//  }

  custom_rule {
    source = "https://www.${var.domain_name}"
    status = "302"
    target = "https://${var.domain_name}"
  }

  environment_variables = {
    AMPLIFY_DIFF_DEPLOY = "false"
    AMPLIFY_MONOREPO_APP_ROOT = "packages/app"
    NEXT_PUBLIC_GQ_SCHEMA_URL = "https://api.gametrade.market/api/schema.graphql"
    NEXT_PUBLIC_GQ_URL = "https://api.gametrade.market/api/graphql"
    NEXT_PUBLIC_WS_URL = "https://api.gametrade.market"
    _LIVE_UPDATES = <<-EOT
        [{"pkg":"next-version","type":"internal","version":"latest"}]
        EOT
  }

//  build_spec = <<-EOT
//    version: 1
//    applications:
//      - appRoot: packages/app
//        frontend:
//          phases:
//            preBuild:
//              commands:
//                - echo "preBuild APP"
//                - pwd
//                - cd ../../
//                - nvm install 16 --latest-npm
//                - nvm use 16
//                - rm -rf node_modules **/node_modules
//                - npm cache clean --force
//                - yarn cache clean
//                - yarn install --frozen-lockfile
//            build:
//              commands:
//                - NEXT_PUBLIC_GQ_URL=${NEXT_PUBLIC_GQ_URL}
//                - NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
//                - NEXT_PUBLIC_GQ_SCHEMA_URL=${NEXT_PUBLIC_GQ_SCHEMA_URL}
//                - echo "Build APP"
//                - pwd
//                # This step will build app with npm workspaces
//                - ./cli.sh build_production_app
//                # This step will build/update SSR resources(S3, Cloudfront, Lambda@Edge)
//                - cd packages/app
//                - yarn install --frozen-lockfile
//                - ls
//          artifacts:
//            baseDirectory: .next
//            files:
//              - '**/*'
//          cache:
//            paths:
//              - node_modules/**/*
//      - appRoot: packages/admin
//        frontend:
//          phases:
//            preBuild:
//              commands:
//                - echo "preBuild admin"
//                - pwd
//                - cd ../../
//                - nvm install 16 --latest-npm
//                - nvm use 16
//                - rm -rf node_modules **/node_modules
//                - npm cache clean --force
//                - yarn cache clean
//                - yarn install --frozen-lockfile
//            build:
//              commands:
//                - NEXT_PUBLIC_GQ_URL=${NEXT_PUBLIC_GQ_URL}
//                - NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
//                - NEXT_PUBLIC_GQ_SCHEMA_URL=${NEXT_PUBLIC_GQ_SCHEMA_URL}
//                - echo "Build admin"
//                - pwd
//                # This step will build app with npm workspaces
//                - ./cli.sh build_production_admin
//                # This step will build/update SSR resources(S3, Cloudfront, Lambda@Edge)
//                - cd packages/admin
//                - yarn install --frozen-lockfile
//                - ls
//          artifacts:
//            baseDirectory: .next
//            files:
//              - '**/*'
//          cache:
//            paths:
//              - node_modules/**/*
//  EOT
}

resource "aws_amplify_branch" "release-app" {
  app_id      = aws_amplify_app.GameTradeMarket-frontend-app.id
  branch_name = "release"

  framework = "Next.js - SSR"
  stage     = "PRODUCTION"
}

resource "aws_amplify_domain_association" "GameTradeMarket-frontend-admin-domain" {
  app_id      = aws_amplify_app.GameTradeMarket-frontend-app.id
  domain_name = var.domain_name

  sub_domain {
    branch_name = aws_amplify_branch.release-app.branch_name
    prefix      = ""
  }
}

resource "aws_iam_role" "amplify_role_app" {
  name = "amplify-role-app"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "amplify.amazonaws.com"
        }
      },
    ]
  })
}

data "aws_iam_policy" "AdministratorAccessApp" {
  arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_iam_role_policy_attachment" "sto-administrator-role-policy-attach" {
  role       = aws_iam_role.amplify_role_app.name
  policy_arn = data.aws_iam_policy.AdministratorAccessApp.arn
}
