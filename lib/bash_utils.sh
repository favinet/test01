#!/bin/bash

# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

readonly TF_CHDIR="/workspace/lib/"
readonly BUCKET_NAME="${PROJECT_ID}-tf-state"


# [START cloudbuild_tf_apply]
function tf_apply {
    echo "Running Terraform init"
    terraform \
        -chdir="$TF_CHDIR" \
        init

    echo "Running Terraform apply"
    terraform \
        -chdir="$TF_CHDIR" \
        apply \
        -auto-approve \
        -var project="$PROJECT_ID"
}
# [END cloudbuild_tf_apply]
