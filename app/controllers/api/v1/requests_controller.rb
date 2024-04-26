class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy ]

  # GET /requests
  def index
    @requests = Request.all
    @tags = params[:tags]
    # викликати фільтер
    render json: @requests
  end

  # GET /requests/1
  def show
    render json: @request
  end

  # POST /requests
  def create
    @request = current_user.requests.build(request_params)
    if @request.save
      render json: @request, status: :created, location: api_v1_requests_path
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /requests/1
  def update
    if @request.update(request_params)
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /requests/1
  def destroy
    @request.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_request
      @request = Request.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def request_params
      params.require(:request).permit(:title, :body, :photo, tag_ids: [])
    end
end
